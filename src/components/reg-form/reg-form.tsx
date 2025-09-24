import { useNavigate } from 'react-router'
import { DEFAULT_EMPTY_STRING, DELAY_AFTER_AUTHORIZATION, MIN_PASSWORD_LENGTH, SPACE } from '../../shared/default-values.ts'
import { ASYNC_ERRORS, isInputValueContainSpace, isNickNameTooLong, LABEL_CONTENT } from '../../pages/auth-page/auth-page.ts'
import '../../pages/auth-page/auth-page.scss'
import { useState, type ChangeEvent, type FormEvent, useEffect, useCallback } from 'react'
import { ROUTES } from '../../shared/routes.ts'
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import { authAPI } from '../../store/personal-account-async-slice/personal-account-api.ts'
import { authSlice } from '../../store/personal-account-slice/reducers.ts'
import SpinnerSrc from '../../assets/icons/spinner.svg'
import SpinnerSrcDark from '../../assets/icons/spinner-dark.svg'




export default function RegForm() {

    const [regUser, { data, isLoading, isSuccess, isError, error }] = authAPI.useCreateUserMutation()
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)

    const [labelContent, setLabelContent] = useState(LABEL_CONTENT.REG)
    const [emailValue, setEmailValue] = useState(DEFAULT_EMPTY_STRING)
    const [passwordValue, setPasswordValue] = useState(DEFAULT_EMPTY_STRING)
    const [userNameValue, setUserNameValue] = useState(DEFAULT_EMPTY_STRING)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const setIsAuth = authSlice.actions.setIsAuth
    const setToken = authSlice.actions.setToken
    const setIsNewUser = authSlice.actions.setIsNewUser




    const onKeyDown = (event: KeyboardEvent) => { if (event.key === SPACE) { setLabelContent(LABEL_CONTENT.BAD_INPUT); setEmailValue(DEFAULT_EMPTY_STRING); return } }

    const onChangeSetEmailValue = (event: ChangeEvent<HTMLInputElement>) => { setEmailValue(event.target.value); setLabelContent(LABEL_CONTENT.REG) }

    const onChangeSetPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (isInputValueContainSpace(event.target.value)) {
            setLabelContent(LABEL_CONTENT.BAD_INPUT)
            return
        }
        setPasswordValue(event.target.value); setLabelContent(LABEL_CONTENT.REG)
    }

    const onChangeSetUserNameValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (isInputValueContainSpace(event.target.value)) { setLabelContent(LABEL_CONTENT.BAD_INPUT); return }
        if (isNickNameTooLong(event.target.value)) { setLabelContent(LABEL_CONTENT.TOO_LONG_NICKNAME); return }
        setUserNameValue(event.target.value);
        setLabelContent(LABEL_CONTENT.REG)
    }


    const onClickToAuth = useCallback(() => dispatch(setIsNewUser(false)), [setIsNewUser, dispatch])

    const sendForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isInputValueContainSpace(emailValue)) { setLabelContent(LABEL_CONTENT.BAD_INPUT); setEmailValue(DEFAULT_EMPTY_STRING); return }
        if (passwordValue.length < MIN_PASSWORD_LENGTH) { setLabelContent(LABEL_CONTENT.SHORT_PASSWORD); return }
        await regUser({ email: emailValue, password: passwordValue, username: userNameValue })
    }

    useEffect(() => {
        if (isSuccess) {
            setLabelContent(LABEL_CONTENT.SUCCESS_REG)
            dispatch(setToken(data.token))
            dispatch(setIsAuth(true))
            setTimeout(() => {
                setEmailValue(DEFAULT_EMPTY_STRING)
                setPasswordValue(DEFAULT_EMPTY_STRING)
                setUserNameValue(DEFAULT_EMPTY_STRING)
                navigate(ROUTES.PERSONAL_ACCOUNT)
            }, DELAY_AFTER_AUTHORIZATION)

        }
    }, [isSuccess, data?.token, dispatch, navigate, setIsAuth, setToken])

    useEffect(() => {
        if (isError) {
            if (error.status === ASYNC_ERRORS.BAD_FETCH_ERROR) { setLabelContent(LABEL_CONTENT.BAD_FETCH) }
            else if (error.status === ASYNC_ERRORS.BAD_REG_ERROR) { setLabelContent(LABEL_CONTENT.BAD_REG) }
            else if (error.status === ASYNC_ERRORS.INVALID_CREDENTIALS) { setLabelContent(LABEL_CONTENT.BAD_REG) }
            console.log(error)
        }
    }, [error, isError])


    const spinnerSrc = isDarkTheme
        ? SpinnerSrcDark
        : SpinnerSrc







    return (
        <section className="section auth__section">
            <div className="container auth__container">
                <form className='auth__form' id='authForm' onSubmit={sendForm}>
                    <> <label htmlFor='authForm' className='auth__label'>{labelContent}</label>
                        <input type='text' placeholder='Придумайте nickname' required value={userNameValue} onChange={onChangeSetUserNameValue} autoComplete='off'></input>
                        <input type='email' value={emailValue} onChange={onChangeSetEmailValue} onKeyDown={onKeyDown} placeholder='Введите email' required autoComplete='off'></input>
                        <input type='password' value={passwordValue} onChange={onChangeSetPasswordValue} placeholder='Введите пароль' required autoComplete='off'></input>
                        <button type='button' className='button' onClick={onClickToAuth}>Есть аккаунт ?</button>
                        <button className="button" type='submit'>Войти</button></>
                </form>
                <div className='auth__spinner-wrapper'>{(isLoading && <img height={30} src={spinnerSrc} />)}</div>
            </div>
        </section>
    )
}