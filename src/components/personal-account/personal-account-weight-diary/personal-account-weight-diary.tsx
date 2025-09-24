import { useNavigate } from "react-router"
import { ROUTES } from "../../../shared/routes"
import { useState, type ChangeEvent, useMemo, useEffect, useRef } from "react"
import { DEFAULT_BODY_VALUE, isCcalCountValid, isMassValid, returnDate, LABEL_CONTENTS, DEFAULT_WEIGHT_GRAPHIC, isMassCritical, isCcalCritical } from "../personal-account"
import ArrowLeftSrc from '../../../assets/icons/arrow-left.svg'
import ArrowLeftSrcDark from '../../../assets/icons/arrow-left-dark.svg'
import SpinnerSrc from '../../../assets/icons/spinner.svg'
import SpinnerSrcDark from '../../../assets/icons/spinner-dark.svg'
import { useAppSelector, useAppDispatch, useAddMassCheckStamp, useGetUserInfo } from "../../../store/hooks"
import { authSlice } from "../../../store/personal-account-slice/reducers"
import { Chart as ChartJS, Legend, registerables } from 'chart.js';
import { Line } from "react-chartjs-2"
import { LABEL_CONTENT } from "../../../pages/auth-page/auth-page"

ChartJS.register(...registerables);

export default function PersonalAccountWeightDiary() {
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)
    const token = useAppSelector(state => state.authReducer.token)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const setCurrentMassDB = useMemo(() => authSlice.actions.setCurrentMassDB, [])
    const prevStatMass = useAppSelector(state => state.authReducer.currentMassDB)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [bodyValue, setBodyValue] = useState(DEFAULT_BODY_VALUE)
    const [graphicData, setGraphicData] = useState(DEFAULT_WEIGHT_GRAPHIC)
    const [chartKey, setChartKey] = useState(0);
    const chartRef = useRef<ChartJS | null>(null);
    const [labelContent, setLabelContent] = useState(LABEL_CONTENTS.DEFAULT_LABEL_WIGHT)


    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);

    const [sendStamp, sendStampResponse] = useAddMassCheckStamp()
    const userData = useGetUserInfo(token)

    const onChangeSetMass = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isMassValid(+event.target.value)) { setIsButtonDisabled(true); return }
        if (isCcalCountValid(bodyValue.ccal)) { setIsButtonDisabled(false) }
        setBodyValue({ ...bodyValue, m: +event.target.value });
    }

    const onChangeSetCcalCount = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isCcalCountValid(+event.target.value)) { setIsButtonDisabled(true); return }
        if (isMassValid(bodyValue.m)) { setIsButtonDisabled(false) }
        setBodyValue({ ...bodyValue, ccal: +event.target.value });
    }

    const onClickSendStamp = async () => {
        if (isMassCritical(bodyValue.m)) { setLabelContent(LABEL_CONTENTS.BAD_WEIGHT) }
        if (isCcalCritical(bodyValue.ccal)) { setLabelContent(LABEL_CONTENTS.BAD_CCAL) }
        if (!isMassCritical(bodyValue.m) && !isCcalCritical(bodyValue.ccal)) { setLabelContent(LABEL_CONTENTS.DEFAULT_LABEL_WIGHT) }
        const newStatMass = [...prevStatMass]
        newStatMass.push({ mass: String(bodyValue.m), ccal: String(bodyValue.ccal), resultDate: String(Date.now()) })
        console.log(newStatMass)
        await sendStamp({ token: token, statBodyMass: newStatMass })
        setChartKey(prev => prev + 1)
    }

    useEffect(() => {
        if (userData.isSuccess) {
            setChartKey(prev => prev + 1)
            dispatch(setCurrentMassDB(userData.data.statBodyMass))
        }
        if (userData.isError) {
            setLabelContent(LABEL_CONTENT.BAD_FETCH)
        }
    }, [userData.isSuccess, userData.data, token, dispatch, setCurrentMassDB, userData.isError])

    useEffect(() => {
        if (sendStampResponse.isError) {
            setLabelContent(LABEL_CONTENT.BAD_FETCH)
        }
        if (sendStampResponse.isSuccess) {
            setChartKey(prev => prev + 1)
            dispatch(setCurrentMassDB(sendStampResponse.data.statBodyMass))
        }

    }, [sendStampResponse.isError, sendStampResponse.error, sendStampResponse.data, dispatch, setCurrentMassDB, prevStatMass, sendStampResponse.isSuccess, sendStampResponse.status])


    useEffect(() => {
        if (!prevStatMass) return
        setChartKey(prev => prev + 1)
        setGraphicData({
            labels: prevStatMass.map((item) => returnDate(new Date(+item.resultDate))),
            datasets: [{
                label: 'Вес утром',
                data: prevStatMass.map((item) => +item.mass),
                backgroundColor: 'red',
                borderColor: 'red'
            },
            {
                label: 'ККАЛ / день',
                data: prevStatMass.map((item) => +item.ccal),
                backgroundColor: 'blue',
                borderColor: 'blue'
            },]

        })
    }, [prevStatMass])


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

    const sendButton = isButtonDisabled
        ? <button className="button-disabled" onClick={onClickSendStamp} disabled >Записать</button>
        : <button className="button" onClick={onClickSendStamp} >Записать</button>

    if (!isAuth) { return <div className="personal__error-message-wrapper container"><h1>Пройдите процесс авторизации</h1><p>p.s. Личный кабинет доступен только зарегистрированным пользователям</p></div> }

    return (<div className="personal__pressure-diary__container container">
        <img height={40} src={arrowSrc} onClick={onClickBackToPersonalAccount} className="arrow-left"></img>
        <h2>Дневник массы тела</h2>
        <div className="personal__collect-wrapper">
            <p>Пользоваться весами вы уже умеете</p>
            <h3>{labelContent}</h3>
            <div className="personal__input-wrapper">
                <input type="number" required placeholder='Масса КГ' onChange={onChangeSetMass} min={10} />
                <input type="number" required placeholder='ККАЛ / день' onChange={onChangeSetCcalCount} min={100} />
                {sendButton}
            </div>
            <div className="personal__stat-wrapper"></div>
        </div>
        {(userData.isSuccess && <ul className="stamp__list"><Line style={{ maxWidth: '90vw', marginInline: 'auto' }} data={graphicData} key={`chart-${chartKey}`} options={{
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
        }} /> </ul>)}
        {(userData.isLoading && <div className='auth__spinner-wrapper'>{(userData.isLoading && <img height={30} src={spinnerSrc} />)}</div>)}


    </div >)
}