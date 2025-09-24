import { useMemo } from 'react'
import './health-check-article-sample.scss'

export type ArticleSampleProps = { prop: { title: { content: string }, about: { content: string, tag: string, subTitle: string }, tech: { content: string, tag: string, subTitle: string }, refer: { content: string, tag: string, subTitle: string }, check: { subTitle: string, tag: string } } }


export default function HealthCheckArticleSample(ArticleSampleProps: ArticleSampleProps) {

    const props = useMemo(() => ArticleSampleProps.prop, [ArticleSampleProps.prop])



    return (<>
        <div className="health-check-article__container container">
            <h3 className='health-check-article__title-main'>{props.title.content}</h3>
            <h4 className='health-check-article__title' id={props.about.tag}>{props.about.subTitle}</h4>
            <p className='health-check-article__paragraph'>{props.about.content}</p>
            <h4 className='health-check-article__title' id={props.tech.tag}>{props.tech.subTitle}</h4>
            <p className='health-check-article__paragraph' >{props.tech.content}</p>
            <h4 className='health-check-article__title' id={props.refer.tag}>{props.refer.subTitle}</h4>
            <p className='health-check-article__paragraph' >{props.refer.content}</p>
            <h4 className='health-check-article__title' id={props.check.tag}>{props.check.subTitle}</h4>
        </div>
    </>)
}
