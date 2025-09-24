import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_EMPTY_STRING } from "../../shared/default-values";
import type { MassDB, PressureDB, RecommendationsDB } from "../personal-account-async-slice/models";



type AccountStoreState = {
    isAuth: boolean;
    token: string;
    isNewUser: boolean,
    currentPressureDB: PressureDB['statPressure'];
    currentMassDB: MassDB['statBodyMass'];
    currentRecommendationsDB: RecommendationsDB['statRecommendations'];

    isDarkTheme: boolean;
}

const initialState: AccountStoreState = { isAuth: false, token: DEFAULT_EMPTY_STRING, isNewUser: true, currentPressureDB: [], isDarkTheme: true, currentMassDB: [], currentRecommendationsDB: [] }

export const authSlice = createSlice({
    name: 'staticAuthData',
    initialState,
    reducers: {
        setIsAuth(state: AccountStoreState, action: PayloadAction<AccountStoreState['isAuth']>) {
            state.isAuth = action.payload
        },
        setToken(state: AccountStoreState, action: PayloadAction<AccountStoreState['token']>) {
            state.token = action.payload
        },
        setIsNewUser(state: AccountStoreState, action: PayloadAction<AccountStoreState['isNewUser']>) {
            state.isNewUser = action.payload
        },
        setCurrentPressureDB(state: AccountStoreState, action: PayloadAction<AccountStoreState['currentPressureDB']>) {
            state.currentPressureDB = action.payload
        },
        setIsDarkTheme(state: AccountStoreState, action: PayloadAction<AccountStoreState['isDarkTheme']>) {
            state.isDarkTheme = action.payload
        },
        setCurrentMassDB(state: AccountStoreState, action: PayloadAction<AccountStoreState['currentMassDB']>) {
            state.currentMassDB = action.payload
        },
        setCurrentRecommendationsDB(state: AccountStoreState, action: PayloadAction<AccountStoreState['currentRecommendationsDB']>) {
            state.currentRecommendationsDB = action.payload
        },
    }
})

export default authSlice.reducer