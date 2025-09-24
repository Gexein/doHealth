import { DEFAULT_HEART_RATE_CHECK_VALUE, HEALTH_CHECK_CALC_LABELS, isSLCritical } from '../../../layouts/health-check-layout/health-check.-layout'
import HealthCheckArticleSample from '../health-check-article-sample/health-check-article-sample'
import { ARTICLES } from '../health-check-articles'
import '../health-check-pressure/health-check-pressure.scss'
import { useState, type ChangeEvent } from 'react'


export default function HealthCheckSugarLevels() {
    const [labelContent, setLabelContent] = useState(HEALTH_CHECK_CALC_LABELS.FILL_FIELDS)
    const [slValue, setSlValue] = useState(DEFAULT_HEART_RATE_CHECK_VALUE)
    const onChangeSetSL = (event: ChangeEvent<HTMLInputElement>) => {
        setSlValue(+event.target.value)
    }


    const onClickCalculate = () => {
        if (isSLCritical(slValue)) { setLabelContent(HEALTH_CHECK_CALC_LABELS.YOU_NEED_A_DOCTOR); return }
        setLabelContent(HEALTH_CHECK_CALC_LABELS.SL_IS_OKAY)
    }

    return (<><section className='health-check-sugar-levels__section section'>
        <HealthCheckArticleSample prop={ARTICLES.SUGAR_LEVEL_ARTICLE} />
        <div className="health-check-pressure__checker container">
            <h3>{labelContent}</h3>
            <div className="collect-wrapper">
                <input type="number" required placeholder='ммоль / л' onChange={onChangeSetSL} />
            </div>
            <button className='button' onClick={onClickCalculate}>Рассчитать</button>
        </div>
    </section>
    </>)
}