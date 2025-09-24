import { useEffect, useState, type ChangeEvent } from 'react'
import HealthCheckArticleSample from '../health-check-article-sample/health-check-article-sample'
import { ARTICLES } from '../health-check-articles'
import { calculateDailyCcalNorm, HEALTH_CHECK_CALC_LABELS } from '../../../layouts/health-check-layout/health-check.-layout'
import '../health-check-pressure/health-check-pressure.scss'

export default function HealthCheckCalorieRequirement() {
    const [labelContent, setLabelContent] = useState(HEALTH_CHECK_CALC_LABELS.FILL_FIELDS)
    const [activity, setActivity] = useState('0')
    const onChangeSetActivity = (event: ChangeEvent<HTMLSelectElement>) => { setActivity(event.target.value) }
    const [sex, setSex] = useState("no")
    const onChangeSetSex = (event: ChangeEvent<HTMLSelectElement>) => { setSex(event.target.value) }
    const [mass, setMass] = useState(0)
    const onChangeSetMass = (event: ChangeEvent<HTMLInputElement>) => { setMass(+event.target.value) }
    const [height, setHeight] = useState(0)
    const onChangeSetHeight = (event: ChangeEvent<HTMLInputElement>) => { setHeight(+event.target.value) }
    const [age, setAge] = useState(0)
    const onChangeSetAge = (event: ChangeEvent<HTMLInputElement>) => { setAge(+event.target.value) }
    const onClickCalculate = () => {
        setLabelContent(calculateDailyCcalNorm(+activity, sex, mass, height, age))
    }


    useEffect(() => {
        console.log('sex', sex, 'activity', activity, "mass", mass, "height", height, "age", age)

    }, [activity, sex, mass, height, age])


    return (<><section className='health-check-calorie-requirement__section section'>
        <HealthCheckArticleSample prop={ARTICLES.CALORIE_REQUIREMENT_ARTICLE} />
        <div className="health-check-pressure__checker container">
            <h3>{labelContent}</h3>
            <div className="collect-wrapper big">
                <select onChange={onChangeSetActivity}>
                    <option value="0" disabled selected>-- Образ жизни --</option>
                    <option value="1.2" >-- Сидячий --</option>
                    <option value="1.375" >-- Лёгкая активность  --</option>
                    <option value="1.55" >-- Умеренная активность  --</option>
                    <option value="1.725" >-- Высокая активность  --</option>
                    <option value="1.9" >-- Очень высокая активность  --</option>
                </select>
                <select onChange={onChangeSetSex}>
                    <option value="no" disabled selected>-- Пол --</option>
                    <option value="w" >-- Женский --</option>
                    <option value="m" >-- Мужской  --</option>

                </select>
                <input type="number" required placeholder='Масса кг' onChange={onChangeSetMass} />
                <input type="number" required placeholder='Рост см' onChange={onChangeSetHeight} />
                <input type="number" required placeholder='Возраст' onChange={onChangeSetAge} />

            </div>
            <button className='button' onClick={onClickCalculate} >Рассчитать</button>
        </div>
    </section>
    </>)
}