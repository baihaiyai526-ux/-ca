export enum MedicationType {
    TCM = '中药',
    WESTERN = '西药'
}

export interface Medication {
    id: string;
    name: string;
    type: MedicationType;
    dosage: string;
    frequency: string;
    nextDose: string;
    instructions: string;
    stock: number;
}

export interface HealthMetric {
    date: string;
    systolic: number;
    diastolic: number;
    bloodSugar: number;
    heartRate: number;
}

export interface Doctor {
    id: string;
    name: string;
    title: string;
    department: string;
    specialty: string[];
    hospital: string;
    imageUrl: string;
    available: boolean;
    consultationCount: number;
    price: number;
}

export interface TCMResult {
    type: string;
    score: number;
    description: string;
    characteristics: string[];
    advice: {
        diet: string;
        exercise: string;
        lifestyle: string;
    };
}
