import { combineReducers, configureStore } from "@reduxjs/toolkit";
import routeReducer from './health-check-slice/reducers'
import authReducer from './personal-account-slice/reducers'
import { authAPI } from "./personal-account-async-slice/personal-account-api";


const rootReducer = combineReducers({
    routeReducer,
    authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(authAPI.middleware)
    })
}

export type AppState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']