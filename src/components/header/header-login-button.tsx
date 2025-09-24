
interface LoginButtonProps {
    onClick: () => void
}

export default function LoginButton(loginButtonProps: LoginButtonProps) {
    return (<button className='header__login button' onClick={loginButtonProps.onClick}>Login</button>)
}