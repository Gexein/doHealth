import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, AppState } from "./store";
import { authAPI } from "./personal-account-async-slice/personal-account-api";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAddPressureCheckStamp = () => {
    return authAPI.useAddPressureCheckStampMutation();
}

export const useGetUserInfo = (token: string) => {
    return authAPI.useGetUserInfoQuery(token)
}

export const useAddMassCheckStamp = () => {
    return authAPI.useAddMassCheckStampMutation()
}

export const useAddRecommendationsStamp = () => {
    return authAPI.useAddRecommendationsStampMutation()
}