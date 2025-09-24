import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



type RouteStoreState = {
    route: string, openedAccordeon: string, isMenuOpen: boolean, isDialogOpen: boolean

}

const initialState: RouteStoreState = { route: '', openedAccordeon: '', isMenuOpen: false, isDialogOpen: false }

export const routeSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setRoute(state: RouteStoreState, action: PayloadAction<RouteStoreState['route']>) {
            state.route = action.payload
        },
        setOpenedAccordeon(state: RouteStoreState, action: PayloadAction<RouteStoreState['openedAccordeon']>) {
            state.openedAccordeon = action.payload
        },
        setIsMenuOpen(state: RouteStoreState, action: PayloadAction<RouteStoreState['isMenuOpen']>) {
            state.isMenuOpen = action.payload
        },
        setIsDialogOpen(state: RouteStoreState, action: PayloadAction<RouteStoreState['isDialogOpen']>) {
            state.isDialogOpen = action.payload
        },

    }
})

export default routeSlice.reducer