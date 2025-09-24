import { type HealthAccordeons } from './health-check-menu-accordeon'
import './health-check-menu.scss'
import HealthCheckAccordeon from './health-check-menu-accordeon.tsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts'
import { useMemo } from "react";
import CrossSrc from '../../../assets/icons/cross.svg'
import CrossSrcDark from '../../../assets/icons/cross-dark.svg'
import { routeSlice } from '../../../store/health-check-slice/reducers.ts'



export default function HealthCheckMenu(healthCheckMenuProps: HealthAccordeons) {

    const isMenuOpen = useAppSelector(state => state.routeReducer.isMenuOpen)
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)
    const setIsMenuOpen = routeSlice.actions.setIsMenuOpen
    const dispatch = useAppDispatch()


    const onClickOpenMenu = () => { dispatch(setIsMenuOpen(!isMenuOpen)) }


    const route = useAppSelector(state => state.routeReducer.route)
    const navigate = useNavigate()

    useEffect(() => {
        navigate(route)
    }, [route, navigate])

    const accordeonList = useMemo(() => healthCheckMenuProps.data.map((accordeon) => {
        return <HealthCheckAccordeon title={accordeon.title} listItems={accordeon.listItems} key={Date.now() - Math.random()} mainRoute={accordeon.mainRoute} />
    }), [healthCheckMenuProps])

    const sectionClassList = isMenuOpen
        ? 'section health-check-menu__section opened-menu'
        : 'section health-check-menu__section'

    const crossSrc = isDarkTheme
        ? CrossSrcDark
        : CrossSrc


    return (<>

        {!isMenuOpen && <button className='button health-check-menu__navigate-button white-button' onClick={onClickOpenMenu}>Меню</button>}
        <section className={sectionClassList}>
            <div className=" health-check-menu__container">
                <div className="health-check-menu__header"><h3>Меню</h3><button onClick={onClickOpenMenu} className='cross-button'><img src={crossSrc} className='cross-img' width={40} /></button></div>
                <ul className="health-check-menu__list">
                    {accordeonList}
                </ul>
            </div>
        </section>

    </>)
}