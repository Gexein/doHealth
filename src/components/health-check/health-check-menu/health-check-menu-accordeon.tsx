
import './health-check-menu.scss'
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AccordeonArrowSrc from '../../../assets/icons/accordeon-arrow.svg'
import AccordeonArrowSrcDark from '../../../assets/icons/accordeon-arrow-dark.svg'
import { routeSlice } from '../../../store/health-check-slice/reducers';
import { DEFAULT_EMPTY_STRING } from '../../../shared/default-values';
import { useMemo } from 'react';



export interface HealthCheckAccordeonProp {
    title: string;
    mainRoute: string;
    listItems: { title: string, subRoute: string }[],
}




export default function HealthCheckAccordeon(healthCheckAccordeonProps: HealthCheckAccordeonProp) {
    const isMenuOpen = useAppSelector(state => state.routeReducer.isMenuOpen)
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)
    const setIsMenuOpen = routeSlice.actions.setIsMenuOpen
    const setRoute = routeSlice.actions.setRoute
    const setOpenedAccordeon = routeSlice.actions.setOpenedAccordeon
    const dispatch = useAppDispatch()
    const openedAccordeon = useAppSelector(state => state.routeReducer.openedAccordeon)
    const isAccordeonOpen = useMemo(() => openedAccordeon === healthCheckAccordeonProps.title, [openedAccordeon, healthCheckAccordeonProps.title])

    const onClickOpenAccordeon = () => {
        if (isAccordeonOpen) { dispatch(setOpenedAccordeon((DEFAULT_EMPTY_STRING))); return }
        dispatch(setOpenedAccordeon((healthCheckAccordeonProps.title)))

    }


    const onClickChangeRoute = (route: string) => { dispatch(setRoute(route)); dispatch(setOpenedAccordeon(DEFAULT_EMPTY_STRING)); dispatch(setIsMenuOpen(!isMenuOpen)) }


    const accordeonContentClassList = isAccordeonOpen
        ? 'health-check-menu__accordeon-content'
        : 'health-check-menu__accordeon-content closed'

    const accordeonLinks = healthCheckAccordeonProps.listItems.map((item) => <li className="health-check-menu__accordeon-item" key={item.title} onClick={() => onClickChangeRoute(healthCheckAccordeonProps.mainRoute)}><a href={item.subRoute}>{item.title}</a></li>)
    const iconClass = isAccordeonOpen
        ? 'rotateIcon'
        : ''

    const accordeonArrowSrc = isDarkTheme
        ? AccordeonArrowSrcDark
        : AccordeonArrowSrc

    return (<>
        <li className="health-check-menu__item ">
            <div className="health-check-menu__accordeon">
                <div className="health-check-menu__summary">
                    <h3 className='health-check-menu__summary-title'>{healthCheckAccordeonProps.title}</h3>
                    <button onClick={onClickOpenAccordeon} ><img src={accordeonArrowSrc} height={30} className={iconClass}></img></button>
                </div>
                <div className={accordeonContentClassList}>
                    <ul className="health-check-menu__accordeon-list">
                        {accordeonLinks}
                    </ul>
                </div>
            </div>
        </li>
    </>)
}









//   <div className="health-check-menu__accordeon">
//             <div className="health-check-menu__summary">
//                 <h3 className='health-check-menu__summary-title'>Давление</h3>
//                 <button onClick={onClickOpenAccordeon}><img src={AccordeonArrow} height={30}></img></button>
//             </div>
//             <div className={accordeonContentClassList}>
//                 <ul className="health-check-menu__accordeon-list">
//                     <li className="health-check-menu__accordeon-item">Что такое давление ?</li>
//                     <li className="health-check-menu__accordeon-item">Принцип работы тонометра</li>
//                     <li className="health-check-menu__accordeon-item">Референсные значения</li>
//                     <li className="health-check-menu__accordeon-item">Проверить давление</li>
//                 </ul>
//             </div>
//         </div>