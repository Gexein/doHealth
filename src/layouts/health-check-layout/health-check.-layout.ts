export const HEALTH_CHECK_CALC_LABELS = {
    FILL_FIELDS: 'Заполните поля корректными данными',
    FILL_FIELDS_CORRECTLY_PRESSURE: 'Диапазон давления: 1 - 350',
    YOU_NEED_A_DOCTOR: 'Обратитесь к врачу !',
    ITS_OKAY: 'Давление в норме',
    HR_IS_OKAY: 'Пульс в норме',
    SL_IS_OKAY: 'Уровень сахара в пределах нормы(натощак)'

}
export const DEFAULT_PRESSURE_CHECK_VALUES = { sd: 0, dd: 0 }
export const DEFAULT_HEART_RATE_CHECK_VALUE = 0
export const DEFAULT_IMT_CHECK_VALUES = { mass: 0, height: 0 }

export const MIN_PRESSURE = 1
export const MAX_PRESSURE = 350

export const MIN_PRESSURE_CRITICAL_SD = 80
export const MAX_PRESSURE_CRITICAL_SD = 145

export const MIN_PRESSURE_CRITICAL_DD = 70
export const MAX_PRESSURE_CRITICAL_DD = 115

export const MIN_HR_CRITICAL = 40
export const MAX_HR_CRITICAL = 140

export const MIN_SL_CRITICAL = 3.3
export const MAX_SL_CRITICAL = 5.5


export const isSDCritical = (SD: number) => {
    if (SD >= MAX_PRESSURE_CRITICAL_SD) return true
    if (SD <= MIN_PRESSURE_CRITICAL_SD) return true
    return false
}

export const isDDCritical = (DD: number) => {
    if (DD >= MAX_PRESSURE_CRITICAL_DD) return true
    if (DD <= MIN_PRESSURE_CRITICAL_DD) return true
    return false
}

export const isHRCritical = (HR: number) => {
    if (HR >= MAX_HR_CRITICAL) return true
    if (HR <= MIN_HR_CRITICAL) return true
    return false
}

export const isSLCritical = (SR: number) => {
    if (SR < MIN_SL_CRITICAL) return true
    if (SR > MAX_SL_CRITICAL) return true
    return false
}


export const returnIMT = (mass: number, height: number) => {
    return mass / Math.pow(height / 100, 2)
}

export const checkIMT = (IMT: number) => {
    switch (true) {
        case IMT <= 5:
            return `Введите корректные данные`
        case IMT < 16 && IMT > 5:
            return `Выраженный дефицит массы тела, ИМТ = ${IMT.toFixed(1)}`;
        case IMT >= 16 && IMT < 18.5:
            return `Недостаточная масса тела, ИМТ = ${IMT.toFixed(1)}`;
        case IMT >= 18.5 && IMT < 25:
            return `Нормальный вес, ИМТ = ${IMT.toFixed(1)}`;
        case IMT >= 25 && IMT < 30:
            return `Избыточная масса тела, ИМТ = ${IMT.toFixed(1)}`;
        case IMT >= 30 && IMT < 35:
            return `Ожирение I степени, ИМТ = ${IMT.toFixed(1)}`;
        case IMT >= 35 && IMT < 40:
            return `Ожирение II степени, ИМТ = ${IMT.toFixed(1)}`;
        default:
            return `Ожирение III степени (морбидное), ИМТ = ${IMT.toFixed(1)}`;
    }
}

export const calculateDailyCcalNorm = (activity: number, sex: string, mass: number, height: number, age: number) => {
    if (activity === 0 || sex === "no" || !activity || !sex || !mass || mass < 2 || mass > 350 || !height || height < 20 || height > 300 || !age || age < 1 || age > 200) return 'Заполните все поля корректными данными'

    switch (sex) {
        case "w": {
            const norm = (447.6 + (9.2 * mass) + (3.1 * height) - (4.3 * age)) * activity
            return `Ваша суточная норма - ${norm} ккал`

        }
        case "m": {
            const norm = (88.36 + (13.4 * mass) + (4.8 * height) - (5.7 * age)) * activity
            return `Ваша суточная норма - ${norm} ккал`
        }
        default: {
            return 'Ошибка рассчетов'
        }
    }

}





