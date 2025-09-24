export const changeTheme = (isDark: boolean) => {
    if (isDark) {
        document.documentElement.style.setProperty('--color-black-alt', '#EDE4E4');
        document.documentElement.style.setProperty('--color-black', '#FFFFFF');
        document.documentElement.style.setProperty('--color-grey', '#30302f');
        document.documentElement.style.setProperty('--color-peach', '#30302f');
    } else {
        document.documentElement.style.setProperty('--color-black-alt', '#30302f');
        document.documentElement.style.setProperty('--color-black', 'rgba(0, 0, 0, 0.904)');
        document.documentElement.style.setProperty('--color-grey', '#EDE4E4');
        document.documentElement.style.setProperty('--color-peach', '#f6c9a5');
    }
}