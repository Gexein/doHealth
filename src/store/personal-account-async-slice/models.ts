export interface RegData {
    username: string;
    email: string;
    password: string;
}

export interface AuthData {
    email: string;
    password: string;
}

export interface UserData {
    _id: string,
    username: string,
    email: string,
    date: string,
    statPressure: PressureCheckStamp[],
    statBodyMass: MassCheckStamp[],
    statRecommendations: RecommendationsStamp[],
    __v: number,
}


export interface Token {
    token: string
}

export type PressureCheckStamp = { sd: string, dd: string, hr: string, resultDate: string }
export type MassCheckStamp = { mass: string, ccal: string, resultDate: string }
export type RecommendationsStamp = { disease: string, detectionTime: string, recommendations: string }

export interface UpdatePressureDB {
    token: Token['token'];
    statPressure: PressureCheckStamp[]
}

export interface UpdateMassDB {
    token: Token['token'];
    statBodyMass: MassCheckStamp[]
}

export interface UpdateRecommendationsDB {
    token: Token['token'];
    statRecommendations: RecommendationsStamp[]
}

export interface PressureDB {
    statPressure: PressureCheckStamp[]
}

export interface MassDB {
    statBodyMass: MassCheckStamp[]
}

export interface RecommendationsDB {
    statRecommendations: RecommendationsStamp[]
}


