import { DEFAULT_HEART_RATE_CHECK_VALUE, HEALTH_CHECK_CALC_LABELS, isHRCritical } from '../../../layouts/health-check-layout/health-check.-layout'
import HealthCheckArticleSample from '../health-check-article-sample/health-check-article-sample'
import { ARTICLES } from '../health-check-articles'
import '../health-check-pressure/health-check-pressure.scss'
import { useState, type ChangeEvent } from 'react'


export default function HealthCheckHeartRate() {
    const [labelContent, setLabelContent] = useState(HEALTH_CHECK_CALC_LABELS.FILL_FIELDS)
    const [hrValue, setHrValue] = useState(DEFAULT_HEART_RATE_CHECK_VALUE)
    const onChangeSetHR = (event: ChangeEvent<HTMLInputElement>) => {
        setHrValue(+event.target.value)
    }


    const onClickCalculate = () => {
        if (isHRCritical(hrValue)) { setLabelContent(HEALTH_CHECK_CALC_LABELS.YOU_NEED_A_DOCTOR); return }
        setLabelContent(HEALTH_CHECK_CALC_LABELS.HR_IS_OKAY)
    }

    return (<><section className='health-check-heart-rate__section section'>
        <HealthCheckArticleSample prop={ARTICLES.HEART_RATE_ARTICLE} />
        <div className="health-check-pressure__checker container">
            <h3>{labelContent}</h3>
            <div className="collect-wrapper">
                <input type="number" required placeholder='ЧСС' onChange={onChangeSetHR} />
            </div>
            <button className='button' onClick={onClickCalculate}>Рассчитать</button>
        </div>
    </section>
    </>)
}