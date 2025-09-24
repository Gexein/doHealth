import { Outlet } from "react-router";
import Header from "../components/header/header";
import { useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { changeTheme } from "./root-layout";






export default function RootLayout() {
    const isDarkTheme = useAppSelector(state => state.authReducer.isDarkTheme)

    useEffect(() => {
        changeTheme(isDarkTheme)
    }, [isDarkTheme])

    return (<>

        <Header />
        <Outlet />

    </>)
}