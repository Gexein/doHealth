import { SPACE } from "../../shared/default-values"

export const isInputValueValid = (value: string) => {
    if (!value || !value.trim() || value.includes(SPACE)) return false
    return true
}

export const isInputValueContainSpace = (value: string) => {
    return value.trim() !== value || value.includes(SPACE)
}

export const isNickNameTooLong = (value: string) => {
    return value.length > 15
}

export const LABEL_CONTENT = {
    AUTH: 'Авторизация',
    REG: 'Регистрация',
    BAD_INPUT: 'Имя пользователя, пароль и email не должны содержать пробелов',
    TOO_LONG_NICKNAME: 'Имя пользователя может содержать до 15-ти символов',
    BAD_AUTH: 'Ошибка авторизации. Такого пользователя не существует',
    BAD_REG: 'Ошибка регистрации. Аккаунт с таким никнеймом / email уже существует',
    BAD_FETCH: 'Ошибка запроса к серверу',
    SUCCESS_AUTH: 'Авторизация прошла успешно',
    SUCCESS_REG: 'Регистрация прошла успешно',
    SHORT_PASSWORD: 'Пароль должен состоять минимум из 6 символов',
}

export const ASYNC_ERRORS = {
    BAD_FETCH_ERROR: 'FETCH_ERROR',
    BAD_REG_ERROR: "PARSING_ERROR",
    INVALID_CREDENTIALS: 400
}
