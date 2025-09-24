import HeartSrc from '../../../assets/icons/heart.svg'
import ScalesSrc from '../../../assets/icons/scales.svg'
import DrugsSrc from '../../../assets/icons/drugs.svg'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../../shared/routes'

export default function PersonalAccountHero() {
    const navigate = useNavigate()

    const onClickNavigateToPressureDiary = () => { navigate(ROUTES.PRESSURE_DIARY) }
    const onClickNavigateToWeightDiary = () => { navigate(ROUTES.WEIGHT_DIARY) }
    const onClickNavigateToRecommendationsDiary = () => { navigate(ROUTES.RECOMMENDATIONS_DIARY) }

    return (<>
        <div className="personal__menu-wrapper">
            <ul className="personal__menu-list">
                <li className="personal__menu-item" onClick={onClickNavigateToPressureDiary}>
                    <><h3>Сердечный дневник. Наблюдайте динамику АД и ЧСС</h3></>
                    <img src={HeartSrc} height={30} />
                </li>
                <li className="personal__menu-item" onClick={onClickNavigateToWeightDiary}>
                    <><h3>Анализируйте потребление калорий и массу тела</h3></>
                    <img src={ScalesSrc} height={30} />
                </li>
                <li className="personal__menu-item" onClick={onClickNavigateToRecommendationsDiary}>
                    <><h3>Храните рекомендации врача и следите за приемом лекарств </h3></>
                    <img src={DrugsSrc} height={30} />
                </li>
            </ul>
        </div>

    </>)
}