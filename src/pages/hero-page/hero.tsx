import './hero.scss'


export default function Hero() {



    return (
        <section className='section hero__section'>
            <div className="container hero__container">
                <h1 className='hero__title'><span>Онлайн - сервис</span>  <span>Do Health ©.</span><span>Делаем здоровье</span> <span>Доступным.</span></h1>
                <div className="hero__description-wrapper">
                    <div className="hero__description-card">
                        <p>
                            Следить за здоровьем еще никогда не было так просто. Онлайн-калькуляторы для моментального HealthChecking`а помогут оценить риски и при необходимости порекомендуют обратиться к профильному специалисту
                        </p>
                    </div>
                    <div className="hero__description-card">
                        <p>
                            Компактные справочники в разделе HealthCheck помогут получить вам общее представление о различных антропометрических индексах, измерительных приборах, референсных значениях.
                        </p>
                    </div>
                    <div className="hero__description-card">
                        <p>
                            Система мониторинга Do Health позволяет вести дневник здоровья, отслеживать динамику самочувствия и контрольных показателей. Доступно зарегистрированным пользователям.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}