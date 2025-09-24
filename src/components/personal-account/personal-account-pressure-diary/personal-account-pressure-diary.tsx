import { useNavigate } from "react-router"
import { ROUTES } from "../../../shared/routes"
import { useAddPressureCheckStamp, useAppDispatch, useAppSelector, useGetUserInfo } from "../../../store/hooks"
import { useMemo, useEffect, useState, type ChangeEvent, useRef } from "react"
import { authSlice } from "../../../store/personal-account-slice/reducers"
import SpinnerSrc from '../../../assets/icons/spinner.svg'
import SpinnerSrcDark from '../../../assets/icons/spinner-dark.svg'
import { DEFAULT_PRESSURE_VALUE, LABEL_CONTENTS, isPressureValid, isPressureStampCritical, returnDate, DEFAULT_GRAPHIC_DATA } from "../personal-account"
import ArrowLeftSrc from '../../../assets/icons/arrow-left.svg'
import ArrowLeftSrcDark from '../../../assets/icons/arrow-left-dark.svg'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2"
import { LABEL_CONTENT } from "../../../pages/auth-page/auth-page"


ChartJS.register(...registerables);

export default function PersonalAccountPressureDiary() {
    const [pressureValue, setPressureValue] = useState(DEFAULT_PRESSURE_VALUE)
    const [labelContent, setLabelContent] = useState(LABEL_CONTENTS.DEFAULT_LABEL_PRESSURE)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [graphicData, setGraphicData] = useState(DEFAULT_GRAPHIC_DATA)
    const [chartKey, setChartKey] = useState(0);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);

    const token = useAppSelector(state => state.authReducer.token)
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const setCurrentPressureDB = useMemo(() => authSlice.actions.setCurrentPressureDB, [])
    const prevStatPressure = useAppSelector(state => state.authReducer.currentPressureDB)



    const onChangeSetSD = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isPressureValid(+event.target.value)) { setIsButtonDisabled(true); return }
        if (isPressureValid(pressureValue.dd) && isPressureValid(pressureValue.hr)) { setIsButtonDisabled(false) }
        setLabelContent(LABEL_CONTENTS.DEFAULT_LABEL_PRESSURE)
        setPressureValue({ ...pressureValue, sd: +event.target.value })
    }
    const onChangeSetDD = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isPressureValid(+event.target.value)) { setIsButtonDisabled(true); return }
        if (isPressureValid(pressureValue.sd) && isPressureValid(pressureValue.hr)) { setIsButtonDisabled(false) }
        setLabelContent(LABEL_CONTENTS.DEFAULT_LABEL_PRESSURE)
        setPressureValue({ ...pressureValue, dd: +event.target.value })
    }

    const onChangeSetHR = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isPressureValid(+event.target.value)) { setIsButtonDisabled(true); return }
        if (isPressureValid(pressureValue.sd) && isPressureValid(pressureValue.dd)) { setIsButtonDisabled(false) }
        setLabelContent(LABEL_CONTENTS.DEFAULT_LABEL_PRESSURE)
        setPressureValue({ ...pressureValue, hr: +event.target.value })
    }

    const [sendStamp, sendStampResponse] = useAddPressureCheckStamp()

    const onClickSendStamp = async () => {
        if (isPressureStampCritical(pressureValue.sd, pressureValue.dd, pressureValue.hr)) { setLabelContent(LABEL_CONTENTS.BAD_PRESSURE) }
        const newStatPressure = [...prevStatPressure]
        newStatPressure.push({ sd: String(pressureValue.sd), dd: String(pressureValue.dd), hr: String(pressureValue.hr), resultDate: String(Date.now()) })
        await sendStamp({ token: token, statPressure: newStatPressure })
        setChartKey(prev => prev + 1)
    }

    useEffect(() => {
        if (!prevStatPressure) return
        setChartKey(prev => prev + 1)
        setGraphicData({
            labels: prevStatPressure.map((item) => returnDate(new Date(+item.resultDate))),
            datasets: [{
                label: 'СД',
                data: prevStatPressure.map((item) => +item.sd),
                backgroundColor: 'red',
                borderColor: 'red'
            },
            {
                label: 'ДД',
                data: prevStatPressure.map((item) => +item.dd),
                backgroundColor: 'pink',
                borderColor: 'pink'
            },
            {
                label: 'Пульс',
                data: prevStatPressure.map((item) => +item.hr),
                backgroundColor: 'blue',
                borderColor: 'blue'
            }]

        })
    }, [prevStatPressure])




    useEffect(() => {
        if (sendStampResponse.isError) {
            setLabelContent(LABEL_CONTENT.BAD_FETCH)
        }
        if (sendStampResponse.isSuccess) {
            console.log(sendStampResponse.data)
            dispatch(setCurrentPressureDB(sendStampResponse.data.statPressure))
            console.log(prevStatPressure)

        }

    }, [sendStampResponse.isError, sendStampResponse.error, sendStampResponse.data, dispatch, setCurrentPressureDB, prevStatPressure, graphicData, sendStampResponse.isSuccess])

    const userData = useGetUserInfo(token)

    useEffect(() => {
        if (userData.isSuccess) {
            dispatch(setCurrentPressureDB(userData.data.statPressure))
            setChartKey(prev => prev + 1)
        }
        if (userData.isError) {
            setLabelContent(LABEL_CONTENT.BAD_FETCH)
        }
    }, [userData.isSuccess, userData.data, dispatch, setCurrentPressureDB, userData.isError])


    const sendButton = isButtonDisabled
        ? <button className="button-disabled" onClick={onClickSendStamp} disabled >Записать</button>
        : <button className="button" onClick={onClickSendStamp} >Записать</button>


    const navigate = useNavigate()
    const onClickBackToPersonalAccount = () => {
        userData.refetch()
        navigate(ROUTES.PERSONAL_ACCOUNT)
    }

    const spinnerSrc = isDarkTheme
        ? SpinnerSrc
        : SpinnerSrcDark

    const arrowSrc = isDarkTheme
        ? ArrowLeftSrcDark
        : ArrowLeftSrc

    if (!isAuth) { return <div className="personal__error-message-wrapper container"><h1>Пройдите процесс авторизации</h1><p>p.s. Личный кабинет доступен только зарегистрированным пользователям</p></div> }

    return (<div className="personal__pressure-diary__container container">
        <img height={40} src={arrowSrc} onClick={onClickBackToPersonalAccount} className="arrow-left"></img>
        <h2>Дневник давления</h2>
        <div className="personal__collect-wrapper">
            <p>Как пользоваться измерительным приборами читайте в разделе HealthCheck</p>
            <h3>{labelContent}</h3>
            <div className="personal__input-wrapper">
                <input type="number" required placeholder='СД' onChange={onChangeSetSD} min={50} />
                <input type="number" required placeholder='ДД' onChange={onChangeSetDD} min={50} />
                <input type="number" required placeholder='ЧСС' onChange={onChangeSetHR} min={40} />
                {sendButton}
            </div>
            <div className="personal__stat-wrapper"></div>
        </div>
        {(userData.isSuccess && <ul className="stamp__list"> <Line style={{ maxWidth: '90vw', marginInline: 'auto' }} data={graphicData} key={`chart-${chartKey}`} options={{
            responsive: true, scales: {
                x: {
                    ticks: {
                        display: window.innerWidth > 768
                    }
                }
            }
        }} ref={(ref) => {
            if (ref) {
                chartRef.current = ref;
            }
        }} /></ul>)}
        {(userData.isLoading && <div className='auth__spinner-wrapper'>{(userData.isLoading && <img height={30} src={spinnerSrc} />)}</div>)}


    </div >)
}