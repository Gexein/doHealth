import { MEDIA_QUERY } from "./media-queries"

export const isDesktop = () => {
    return window.matchMedia(`(min-width: ${MEDIA_QUERY.MIN_DESKTOP_WIDTH}px)`).matches
}

export const isTablet = () => {
    return window.matchMedia(`(min-width: ${MEDIA_QUERY.MIN_TABLET_WIDTH}px)`).matches
}

export const isMobile = () => {
    return window.matchMedia(`(min-width: ${MEDIA_QUERY.MIN_MOBILE_LARGE_WIDTH}px)`).matches
}

export const isMobileS = () => {
    return window.matchMedia(`(min-width: ${MEDIA_QUERY.MIN_MOBILE_WIDTH}px)`).matches
}
