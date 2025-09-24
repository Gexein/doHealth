import { DEFAULT_EMPTY_STRING } from "../../shared/default-values"

export function isPressureValid(stamp: number) {
    return stamp >= 1 && stamp <= 250
}

export function isMassValid(mass: number) {
    return mass <= 300 && mass >= 5
}

export function isCcalCountValid(count: number) {
    return count <= 9000 && count >= 50
}

export function isRecommendationValid(recomvendation: string) {
    return recomvendation.length > 4
}

export function isPressureStampCritical(sd: number, dd: number, hr: number) {
    if (sd < 90 || sd > 170) return true
    if (dd < 70 || dd > 150) return true
    if (hr < 40 || hr > 180) return true
    return false
}

export function isMassCritical(mass: number) {
    if (mass >= 120 || mass <= 40) return true
    return false
}

export function isCcalCritical(ccal: number) {
    if (ccal <= 500 || ccal >= 3500) return true
    return false
}



export const LABEL_CONTENTS = {
    BAD_PRESSURE: 'Срочно обратитесь ко врачу !',
    DEFAULT_LABEL_PRESSURE: 'Добавить измерение',
    DEFAULT_LABEL_WIGHT: 'Добавьте штамп массы тела(утром натощак) и кол-во калорий за день',
    BAD_WEIGHT: 'Обратите внимание на массу тела. Необходима консультация специалиста !',
    BAD_CCAL: 'Обратите внимание на кол-во потребляемых калорий. Необходима консультация специалиста !'
}

export const DEFAULT_PRESSURE_VALUE = { sd: 0, dd: 0, hr: 0 }
export const DEFAULT_BODY_VALUE = { m: 0, ccal: 0 }
export const DEFAULT_RECOMMENDATIONS_VALUE = { disease: DEFAULT_EMPTY_STRING, recommendations: DEFAULT_EMPTY_STRING }

export type DataSets = {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string
}

export interface GraphicData {
    labels: string[],
    datasets: DataSets[]
}

export const DEFAULT_GRAPHIC_DATA: GraphicData = {
    labels: [],
    datasets: [{
        label: 'СД',
        data: [],
        backgroundColor: 'red',
        borderColor: 'red'
    },
    {
        label: 'ДД',
        data: [],
        backgroundColor: 'pink',
        borderColor: 'pink'
    },
    {
        label: 'Пульс',
        data: [],
        backgroundColor: 'blue',
        borderColor: 'blue'
    }]
}

export const DEFAULT_WEIGHT_GRAPHIC: GraphicData = {
    labels: [],
    datasets: [{
        label: 'Вес утром',
        data: [],
        backgroundColor: 'red',
        borderColor: 'red'
    },
    {
        label: 'ККАЛ / день',
        data: [],
        backgroundColor: 'pink',
        borderColor: 'pink'
    },]
}

export const returnDate = (date: Date) => {

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`

}


