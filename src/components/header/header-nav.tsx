
interface HandlesProps {
    onClickToHealthCheck: () => void
}

export default function HeaderNav(handlesProps: HandlesProps) {
    return (<>
        <nav className='header__nav'>
            <ul className='header__list'>

                <li className="header__item" onClick={handlesProps.onClickToHealthCheck}>HealthCheck</li>

            </ul>
        </nav>
    </>)
}