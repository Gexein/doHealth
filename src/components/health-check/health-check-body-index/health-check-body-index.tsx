import { checkIMT, DEFAULT_IMT_CHECK_VALUES, HEALTH_CHECK_CALC_LABELS, returnIMT } from '../../../layouts/health-check-layout/health-check.-layout'
import HealthCheckArticleSample from '../health-check-article-sample/health-check-article-sample'
import { ARTICLES } from '../health-check-articles'
import '../health-check-pressure/health-check-pressure.scss'
import { useState, type ChangeEvent } from 'react'

export default function HealthCheckBodyIndex() {
    const [labelContent, setLabelContent] = useState(HEALTH_CHECK_CALC_LABELS.FILL_FIELDS)
    const [imtValues, setimtValues] = useState(DEFAULT_IMT_CHECK_VALUES)
    const onChangeSetMass = (event: ChangeEvent<HTMLInputElement>) => {
        setimtValues({ ...imtValues, mass: +event.target.value })

    }
    const onChangeSetHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setimtValues({ ...imtValues, height: +event.target.value })
    }

    const onClickCalculate = () => {
        setLabelContent(checkIMT(returnIMT(imtValues.mass, imtValues.height)))
        console.log(returnIMT(imtValues.mass, imtValues.height))
    }

    return (<><section className='health-check-body-index__section section'>
        <HealthCheckArticleSample prop={ARTICLES.BODY_INDEX_ARTICLE} />
        <div className="health-check-pressure__checker container">
            <h3>{labelContent}</h3>
            <div className="collect-wrapper">
                <input type="number" required placeholder='Рост см' onChange={onChangeSetHeight} />
                <input type="number" required placeholder='Масса кг' onChange={onChangeSetMass} />
            </div>
            <button className='button' onClick={onClickCalculate}>Рассчитать</button>
        </div>
    </section>
    </>)
}