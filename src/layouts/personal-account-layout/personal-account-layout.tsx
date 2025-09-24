import { useMemo } from "react"
import { useAppSelector } from "../../store/hooks"
import './personal-account-layout.scss'
import { Outlet } from "react-router"



export default function PersonalAccount() {
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const content = useMemo(() => {
        if (isAuth) {
            return <section className="personal__section section">
                <div className="personal__container container">
                    <h1>Личный кабинет</h1>
                    <Outlet />
                </div>
            </section>
        } else {
            return <div className="personal__error-message-wrapper container"><h1>Пройдите процесс авторизации</h1>
                <p>p.s. Личный кабинет доступен только зарегистрированным пользователям</p>
            </div>
        }
    }, [isAuth])

    return (content)
}