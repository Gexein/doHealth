import { ROUTES } from "../../../shared/routes.ts"
import type { HealthCheckAccordeonProp } from "./health-check-menu-accordeon.tsx"

export interface HealthAccordeons {
    data: HealthCheckAccordeonProp[]
}

export const HEALTH_CHECK_ACCORDEONS = {
    data: [{
        title: 'Давление',
        mainRoute: ROUTES.PRESSURE,
        listItems: [{ title: 'Что такое давление ?', subRoute: '#pressure-about' }, { title: 'Принцип работы тонометра', subRoute: '#pressure-tech' }, { title: 'Референсные значения', subRoute: '#pressure-refer' }, { title: 'Проверить давление', subRoute: '#pressure-check' }]
    },

    {
        title: 'ИМТ',
        mainRoute: ROUTES.BODY_INDEX,
        listItems: [{ title: 'Что такое ИМТ ?', subRoute: '#BMI-about' },
        { title: 'Как вычисляют ИМТ ?', subRoute: '#BMI-tech' },
        { title: 'Референсные значения', subRoute: '#BMI-refer' },
        { title: 'Рассчитать ИМТ', subRoute: '#BMI-check' }]
    },
    {
        title: 'ЧСС',
        mainRoute: ROUTES.HEART_RATE,
        listItems: [{ title: 'Что такое ЧСС ?', subRoute: '#HR-about' },
        { title: 'Принцип работы пульсометра', subRoute: '#HR-tech' },
        { title: 'Референсные значения', subRoute: '#HR-refer' },
        { title: 'Проверить ЧСС', subRoute: '#HR-check' }]
    },
    {
        title: 'Уровень сахара',
        mainRoute: ROUTES.SUGAR_LEVELS,
        listItems: [{ title: 'Что такое уровень сахара ?', subRoute: '#SL-about' },
        { title: 'Принцип работы глюкометра', subRoute: '#SL-tech' },
        { title: 'Референсные значения', subRoute: '#SL-refer' },
        { title: 'Проверить сахар', subRoute: '#SL-check' }]
    },
    {
        title: 'Норма калорий',
        mainRoute: ROUTES.CALORIE_REQUIREMENT,
        listItems: [{ title: 'Что такое норма калорий ?', subRoute: '#CR-about' },
        { title: 'Как вычислить норму калорий ?', subRoute: '#CR-tech' },
        { title: 'Референсные значения', subRoute: '#CR-refer' },
        { title: 'Рассчитать норму калорий', subRoute: '#CR-check' }]
    }
    ]

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