import './auth-page.scss'
import { useAppSelector } from '../../store/hooks'
import AuthForm from '../../components/auth-form/auth-form'
import RegForm from '../../components/reg-form/reg-form'
import { useStore } from 'react-redux'

export default function Authorization() {

    const isNewUser = useAppSelector(state => state.authReducer.isNewUser)
    const store = useStore()
    store.subscribe(() => store.getState())

    const content = isNewUser
        ? <RegForm />
        : <AuthForm />

    return (<>
        {content}
    </>)
}