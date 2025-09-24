import { ROUTES } from '../../shared/routes'
import './header.scss'
import LogoSrcLight from '../../assets/icons/logo.svg'
import LogoSrcDark from '../../assets/icons/logoDark.svg'
import MenuSrc from '../../assets/icons/menu.svg'
import MenuSrcDark from '../../assets/icons/menu-dark.svg'
import CrossSrc from '../../assets/icons/cross.svg'
import CrossSrcDark from '../../assets/icons/cross-dark.svg'
import ExitSrc from '../../assets/icons/exit.svg'
import ExitSrcDark from '../../assets/icons/exit-black.svg'
import PersonalSrc from '../../assets/icons/profile.svg'
import PersonalSrcDark from '../../assets/icons/profile-black.svg'
import { isDesktop } from '../../shared/media-utils'
import HeaderNav from './header-nav'
import { useNavigate } from 'react-router'
import LoginButton from './header-login-button'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { routeSlice } from '../../store/health-check-slice/reducers'
import { authSlice } from '../../store/personal-account-slice/reducers'

export default function Header() {
    const isDialogOpen = useAppSelector(state => state.routeReducer.isDialogOpen)
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)
    const setIsDialogOpen = routeSlice.actions.setIsDialogOpen
    const setIsAuth = authSlice.actions.setIsAuth
    const setIsDarkTheme = authSlice.actions.setIsDarkTheme
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onClickToAuthorization = () => { navigate(ROUTES.AUTHORIZATION); dispatch(setIsDialogOpen(false)) }
    const onClickChangeTheme = () => {
        dispatch(setIsDarkTheme(!isDarkTheme))
    }
    const onClickToHealthCheck = () => { navigate(ROUTES.HEALTH_CHECK); dispatch(setIsDialogOpen(false)) }
    const onClickHome = () => { navigate(ROUTES.HOME); dispatch(setIsDialogOpen(false)) }
    const onClickOpenModal = () => { dispatch(setIsDialogOpen(true)) }
    const onClickCloseModal = () => { dispatch(setIsDialogOpen(false)) }
    const onClickToPersonalAccount = () => { navigate(ROUTES.PERSONAL_ACCOUNT); dispatch(setIsDialogOpen(false)) }
    const onClickToExit = () => {
        navigate(ROUTES.HOME)
        dispatch(setIsAuth(false))
        dispatch(setIsDialogOpen(false))
    }


    const dialogClassList = isDialogOpen
        ? 'header__dialog opened'
        : 'header__dialog'

    const menuSrc = isDarkTheme
        ? MenuSrcDark
        : MenuSrc

    const crossSrc = isDarkTheme
        ? CrossSrcDark
        : CrossSrc

    const personalSrc = isDarkTheme
        ? PersonalSrcDark
        : PersonalSrc

    const exitSrc = isDarkTheme
        ? ExitSrcDark
        : ExitSrc


    const navBarContent = isDesktop()
        ? <><HeaderNav onClickToHealthCheck={onClickToHealthCheck} />
            {!isAuth && (<LoginButton onClick={onClickToAuthorization} />)}
            {(isAuth && <div className='header-account-button-wrapper'><img src={personalSrc} height={30} onClick={onClickToPersonalAccount} />
                <img src={exitSrc} height={30} onClick={onClickToExit} />
            </div>)} </>


        : <><button className='header__burger-button' onClick={onClickOpenModal}><img src={menuSrc} /></button>
            <dialog className={dialogClassList}  >
                <button onClick={onClickCloseModal} className='cross-button'><img src={crossSrc} className='cross-img' width={40} /></button>
                <HeaderNav onClickToHealthCheck={onClickToHealthCheck} />
                {(isAuth && <div className='header-account-button-wrapper'><img src={personalSrc} height={30} onClick={onClickToPersonalAccount} />
                    <img src={exitSrc} height={30} onClick={onClickToExit} />
                </div>)}
                {(!isAuth && <LoginButton onClick={onClickToAuthorization} />)}
            </dialog>
        </>

    const logoSrc = isDarkTheme
        ? LogoSrcDark
        : LogoSrcLight

    const switchButtonClassList = isDarkTheme
        ? 'header__switch-theme-button'
        : 'header__switch-theme-button switched'


    return (<>
        <header className='header'>
            <div className='container header__container'>
                <img src={logoSrc} width={150} onClick={onClickHome} className='header__logo' />
                {navBarContent}
                <button className={switchButtonClassList} onClick={onClickChangeTheme}></button>
            </div>
        </header>

    </>)
}