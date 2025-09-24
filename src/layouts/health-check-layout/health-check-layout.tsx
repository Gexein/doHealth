
import HealthCheckFaq from "../../components/health-check/health-check-faq/health-check-faq";
import './health-check.scss'
import HealthCheckMenu from "../../components/health-check/health-check-menu/health-check-menu";
import { HEALTH_CHECK_ACCORDEONS } from "../../components/health-check/health-check-menu/health-check-menu-accordeon";
import { Outlet } from "react-router";


export default function HealthCheck() {
    return (
        <>
            <div className="health-check__wrapper">

                <HealthCheckMenu data={HEALTH_CHECK_ACCORDEONS.data} />
                <div >
                    <HealthCheckFaq />
                    <Outlet />
                </div>
            </div>
        </>
    )
}