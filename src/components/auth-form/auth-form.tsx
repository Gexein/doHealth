import { useNavigate } from 'react-router'
import { DEFAULT_EMPTY_STRING, DELAY_AFTER_AUTHORIZATION, SPACE, MIN_PASSWORD_LENGTH } from '../../shared/default-values'
import { isInputValueContainSpace, LABEL_CONTENT, ASYNC_ERRORS } from '../../pages/auth-page/auth-page.ts'
import '../../pages/auth-page/auth-page.scss'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { ROUTES } from '../../shared/routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { authAPI } from '../../store/personal-account-async-slice/personal-account-api'
import { authSlice } from '../../store/personal-account-slice/reducers'
import SpinnerSrc from '../../assets/icons/spinner.svg'
import SpinnerSrcDark from '../../assets/icons/spinner-dark.svg'




export default function AuthForm() {

    const [authUser, { data, isLoading, isSuccess, isError, error }] = authAPI.useAuthUserMutation()
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)

    const [labelContent, setLabelContent] = useState(LABEL_CONTENT.AUTH)
    const [emailValue, setEmailValue] = useState(DEFAULT_EMPTY_STRING)
    const [passwordValue, setPasswordValue] = useState(DEFAULT_EMPTY_STRING)

    const navigate = useNavigate()


    const dispatch = useAppDispatch()
    const setIsAuth = authSlice.actions.setIsAuth
    const setToken = authSlice.actions.setToken
    const setIsNewUser = authSlice.actions.setIsNewUser

    const onClickGoBack = () => { dispatch(setIsNewUser(true)) }

    const onKeyDown = (event: KeyboardEvent) => { if (event.key === SPACE) { setLabelContent(LABEL_CONTENT.BAD_INPUT); setEmailValue(DEFAULT_EMPTY_STRING); return } }

    const onChangeSetEmailValue = (event: ChangeEvent<HTMLInputElement>) => { setEmailValue(event.target.value); setLabelContent(LABEL_CONTENT.AUTH) }

    const onChangeSetPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (isInputValueContainSpace(event.target.value)) {
            setLabelContent(LABEL_CONTENT.BAD_INPUT)
            return
        }
        setPasswordValue(event.target.value); setLabelContent(LABEL_CONTENT.AUTH)
    }

    const sendForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isInputValueContainSpace(emailValue)) { setLabelContent(LABEL_CONTENT.BAD_INPUT); setEmailValue(DEFAULT_EMPTY_STRING); return }
        if (passwordValue.length < MIN_PASSWORD_LENGTH) { setLabelContent(LABEL_CONTENT.SHORT_PASSWORD); return }
        await authUser({ email: emailValue, password: passwordValue })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setIsAuth(true))
            dispatch(setToken(data.token))
            setLabelContent(LABEL_CONTENT.SUCCESS_AUTH)
            setTimeout(() => {
                setEmailValue(DEFAULT_EMPTY_STRING)
                setPasswordValue(DEFAULT_EMPTY_STRING)
                navigate(ROUTES.PERSONAL_ACCOUNT)
            }, DELAY_AFTER_AUTHORIZATION)
        }
    }, [data?.token, dispatch, isSuccess, navigate, setIsAuth, setToken])

    useEffect(() => {
        if (isError) {
            if (error.status === ASYNC_ERRORS.BAD_FETCH_ERROR) { setLabelContent(LABEL_CONTENT.BAD_FETCH) }
            else if (error.status === ASYNC_ERRORS.INVALID_CREDENTIALS) { setLabelContent(LABEL_CONTENT.BAD_AUTH) }
            console.log(error)
        }
    }, [isError, error])

    const spinnerSrc = isDarkTheme
        ? SpinnerSrcDark
        : SpinnerSrc






    return (<>
        <section className="section auth__section">
            <div className="container auth__container">
                <form className='auth__form' id='authForm' onSubmit={sendForm}>
                    <><label htmlFor='authForm' className='auth__label'>{labelContent}</label>
                        <input type='email' value={emailValue} onChange={onChangeSetEmailValue} onKeyDown={onKeyDown} placeholder='Введите email' required ></input>
                        <input type='password' value={passwordValue} onChange={onChangeSetPasswordValue} placeholder='Введите пароль' required></input>
                        <button type='button' className='button' onClick={onClickGoBack}>Регистрация</button>
                        <button className="button" type='submit'>Войти</button></>
                </form>
                <div className='auth__spinner-wrapper'>{(isLoading && <img height={30} src={spinnerSrc} />)}</div>
            </div>
        </section>
    </>)
}