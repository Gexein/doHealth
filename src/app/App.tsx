import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { ROUTES } from "../shared/routes";
import RootLayout from "../layouts/root-layout.tsx";
import Hero from "../pages/hero-page/hero.tsx";
import Authorization from "../pages/auth-page/auth-page.tsx";
import HealthCheck from '../layouts/health-check-layout/health-check-layout.tsx'
import HealthCheckPressure from '../components/health-check/health-check-pressure/health-check-pressure.tsx'
import HealthCheckBodyIndex from '../components/health-check/health-check-body-index/health-check-body-index.tsx'
import { Provider } from "react-redux";
import { setupStore } from "../store/store.ts";
import HealthCheckBody from "../layouts/health-check-body-layout/health-check-body-layout.tsx";
import HealthCheckSugarLevels from "../components/health-check/health-check-sugar-levels/health-check-sugar-levels.tsx";
import HealthCheckHeartRate from "../components/health-check/health-check-heart-rate/health-check-heart-rate.tsx";
import HealthCheckCalorieRequirement from "../components/health-check/health-check-calorie-requirement/health-check-calorie-requirement.tsx";
import PersonalAccount from "../layouts/personal-account-layout/personal-account-layout.tsx";
import PersonalAccountHero from "../components/personal-account/personal-account-hero/personal-account-hero.tsx";
import PersonalAccountPressureDiary from "../components/personal-account/personal-account-pressure-diary/personal-account-pressure-diary.tsx";
import PersonalAccountWeightDiary from "../components/personal-account/personal-account-weight-diary/personal-account-weight-diary.tsx";
import PersonalAccountRecommendationDiary from "../components/personal-account/personal-account-recommendation-diary/personal-account-recommendation-diary.tsx";





const store = setupStore()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.HOME} element={<RootLayout />}>
      <Route index element={<Hero />} />
      <Route path={ROUTES.AUTHORIZATION} element={<Authorization />} />
      <Route path={ROUTES.HEALTH_CHECK} element={<HealthCheck />}>
        <Route index element={<HealthCheckBody />} />
        <Route path={ROUTES.PRESSURE} element={<HealthCheckPressure />} />
        <Route path={ROUTES.BODY_INDEX} element={<HealthCheckBodyIndex />} />
        <Route path={ROUTES.SUGAR_LEVELS} element={<HealthCheckSugarLevels />} />
        <Route path={ROUTES.HEART_RATE} element={<HealthCheckHeartRate />} />
        <Route path={ROUTES.CALORIE_REQUIREMENT} element={<HealthCheckCalorieRequirement />} />
      </Route>
      <Route path={ROUTES.PERSONAL_ACCOUNT} element={<PersonalAccount />} >
        <Route index element={<PersonalAccountHero />} />
        <Route path={ROUTES.PRESSURE_DIARY} element={<PersonalAccountPressureDiary />} />
        <Route path={ROUTES.WEIGHT_DIARY} element={<PersonalAccountWeightDiary />} />
        <Route path={ROUTES.RECOMMENDATIONS_DIARY} element={<PersonalAccountRecommendationDiary />} />
      </Route>
    </Route >
  )
)

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
