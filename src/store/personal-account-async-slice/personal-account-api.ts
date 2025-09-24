import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RegData, Token, UserData, AuthData, UpdatePressureDB, UpdateMassDB, UpdateRecommendationsDB } from "./models";




export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}/api/auth` }),
    endpoints: (build) => ({
        createUser: build.mutation<Token, RegData>({
            query: (regData: RegData) => ({
                url: '/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": `${regData.username}`,
                    "email": `${regData.email}`,
                    "password": `${regData.password}`
                }),
            }),
        }),
        getUserInfo: build.query<UserData, Token['token']>({
            query: (token: Token['token']) => ({
                url: '',
                method: 'GET',
                headers: {
                    "x-auth-token": `${token}`
                }
            })
        }),
        authUser: build.mutation<Token, AuthData>({
            query: (authData: AuthData) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": `${authData.email}`,
                    "password": `${authData.password}`
                }),
            }),
        }),
        addPressureCheckStamp: build.mutation<UserData, UpdatePressureDB>({
            query: (updatePressureDB: UpdatePressureDB) => ({
                url: '',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `${updatePressureDB.token}`
                },
                body: {
                    statPressure: updatePressureDB.statPressure
                },
            }),
        }),
        addMassCheckStamp: build.mutation<UserData, UpdateMassDB>({
            query: (updateMassDB: UpdateMassDB) => ({
                url: '',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `${updateMassDB.token}`
                },
                body: {
                    statBodyMass: updateMassDB.statBodyMass
                },
            }),
        }),
        addRecommendationsStamp: build.mutation<UserData, UpdateRecommendationsDB>({
            query: (updateRecommendationsDB: UpdateRecommendationsDB) => ({
                url: '',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `${updateRecommendationsDB.token}`
                },
                body: {
                    statRecommendations: updateRecommendationsDB.statRecommendations
                },
            }),
        }),
    })
})