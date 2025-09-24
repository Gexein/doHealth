import { DEFAULT_PRESSURE_CHECK_VALUES, HEALTH_CHECK_CALC_LABELS, isDDCritical, isSDCritical, MAX_PRESSURE, MIN_PRESSURE } from '../../../layouts/health-check-layout/health-check.-layout'
import HealthCheckArticleSample from '../health-check-article-sample/health-check-article-sample'
import { ARTICLES } from '../health-check-articles'
import './health-check-pressure.scss'
import { useState, type ChangeEvent } from 'react'

export default function HealthCheckPressure() {
    const [labelContent, setLabelContent] = useState(HEALTH_CHECK_CALC_LABELS.FILL_FIELDS)
    const [pressureValues, setPressureValues] = useState(DEFAULT_PRESSURE_CHECK_VALUES)
    const onChangeSetSD = (event: ChangeEvent<HTMLInputElement>) => {
        setPressureValues({ ...pressureValues, sd: +event.target.value })

    }
    const onChangeSetDD = (event: ChangeEvent<HTMLInputElement>) => {
        setPressureValues({ ...pressureValues, dd: +event.target.value })
    }

    const onClickCalculate = () => {
        if (pressureValues.dd < MIN_PRESSURE || pressureValues.dd > MAX_PRESSURE || pressureValues.sd < MIN_PRESSURE || pressureValues.sd > MAX_PRESSURE) {
            setLabelContent(HEALTH_CHECK_CALC_LABELS.FILL_FIELDS_CORRECTLY_PRESSURE); return
        }
        if (isSDCritical(pressureValues.sd) || isDDCritical(pressureValues.dd)) { setLabelContent(HEALTH_CHECK_CALC_LABELS.YOU_NEED_A_DOCTOR); return }
        setLabelContent(HEALTH_CHECK_CALC_LABELS.ITS_OKAY)

    }

    return (<><section className='health-check-pressure__section section'>
        <HealthCheckArticleSample prop={ARTICLES.PRESSURE_ARTICLE} />
        <div className="health-check-pressure__checker container">
            <h3>{labelContent}</h3>
            <div className="collect-wrapper">
                <input type="number" required placeholder='СД' onChange={onChangeSetSD} />
                <input type="number" required placeholder='ДД' onChange={onChangeSetDD} />
            </div>
            <button className='button' onClick={onClickCalculate}>Рассчитать</button>
        </div>
    </section>
    </>)
}

