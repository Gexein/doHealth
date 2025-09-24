import { useNavigate } from "react-router"
import { ROUTES } from "../../../shared/routes"
import { useState, type ChangeEvent, useMemo, useEffect } from "react"
import { DEFAULT_RECOMMENDATIONS_VALUE, isRecommendationValid, returnDate } from "../personal-account"
import ArrowLeftSrc from '../../../assets/icons/arrow-left.svg'
import ArrowLeftSrcDark from '../../../assets/icons/arrow-left-dark.svg'
import SpinnerSrc from '../../../assets/icons/spinner.svg'
import SpinnerSrcDark from '../../../assets/icons/spinner-dark.svg'
import { useAppSelector, useAppDispatch, useGetUserInfo, useAddRecommendationsStamp } from "../../../store/hooks"
import { authSlice } from "../../../store/personal-account-slice/reducers"


export default function PersonalAccountRecommendationsDiary() {
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)
    const token = useAppSelector(state => state.authReducer.token)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const setCurrentRecommendationsDB = useMemo(() => authSlice.actions.setCurrentRecommendationsDB, [])
    const prevRecommendations = useAppSelector(state => state.authReducer.currentRecommendationsDB)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [recommendationsValue, setRecommendationsValue] = useState(DEFAULT_RECOMMENDATIONS_VALUE)

    const [sendStamp, sendStampResponse] = useAddRecommendationsStamp()
    const userData = useGetUserInfo(token)

    const onChangeSetDisease = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isRecommendationValid(event.target.value)) { setIsButtonDisabled(true); return }
        if (isRecommendationValid(recommendationsValue.recommendations)) { setIsButtonDisabled(false) }
        setRecommendationsValue({ ...recommendationsValue, disease: event.target.value });
    }

    const onChangeSetCcalCount = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isRecommendationValid(event.target.value)) { setIsButtonDisabled(true); return }
        if (isRecommendationValid(recommendationsValue.disease)) { setIsButtonDisabled(false) }
        setRecommendationsValue({ ...recommendationsValue, recommendations: event.target.value });
    }

    const onClickSendStamp = async () => {
        const newRecommendations = [...prevRecommendations]
        newRecommendations.push({ disease: recommendationsValue.disease, recommendations: recommendationsValue.recommendations, detectionTime: String(Date.now()) })
        console.log(newRecommendations)
        await sendStamp({ token: token, statRecommendations: newRecommendations })
    }

    useEffect(() => {
        if (userData.isSuccess) {
            dispatch(setCurrentRecommendationsDB(userData.data.statRecommendations))
            console.log(userData.data.statRecommendations)
        }
    }, [userData.isSuccess, userData.data, token, dispatch, setCurrentRecommendationsDB])

    useEffect(() => {
        if (sendStampResponse.isError) {
            console.log(sendStampResponse.isError, sendStampResponse.error)
        }
        if (sendStampResponse.isSuccess) {
            console.log("useEffect, isSucces", sendStampResponse.status)

        }
        if (sendStampResponse.data) {
            console.log("returned Data body mass", sendStampResponse.data)
            dispatch(setCurrentRecommendationsDB(sendStampResponse.data.statRecommendations))
            console.log(prevRecommendations)
        }

    }, [sendStampResponse.isError, sendStampResponse.error, sendStampResponse.data, dispatch, setCurrentRecommendationsDB, prevRecommendations, sendStampResponse.isSuccess, sendStampResponse.status])

    const list = useMemo(() => {

        if (!prevRecommendations) return null
        return prevRecommendations.map((item) => {
            const date = returnDate(new Date(+item.detectionTime))
            return <li key={item.detectionTime}>
                <div className="stamp__wrapper-recommendations">
                    <div className="recommendation-stamp">
                        <div className="disease">{item.disease}</div>
                        <div className="disease-time">{String(date)}</div>
                        <div className="recommendation">Рекомендация: {item.recommendations}</div>
                    </div>
                </div>
            </li>
        })
    }, [prevRecommendations])

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
        <h2>Мои заболевания</h2>
        <div className="personal__collect-wrapper">
            <p>Заболеваем? Первым делом идем ко врачу!</p>
            <h3>Занесите сведения о заболевании и рекомендации врача</h3>
            <div className="personal__input-wrapper">
                <input type="text" required placeholder='Болячка' onChange={onChangeSetDisease} className="wide" />
                <input type="text" required placeholder='Рекомендации врача' onChange={onChangeSetCcalCount} className="wide" />
                {sendButton}
            </div>
            <div className="personal__stat-wrapper"></div>
        </div>
        {(userData.isSuccess && <ul className="stamp__list"> {list}</ul>)}
        {(userData.isLoading && <div className='auth__spinner-wrapper'>{(userData.isLoading && <img height={30} src={spinnerSrc} />)}</div>)}


    </div >)
}