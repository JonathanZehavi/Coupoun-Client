import { ReactChild, ReactChildren } from "react";
import { ReactNode } from "react";

export interface ICoupon {
    id: number;
    title: string;
    description: string;
    startDate: [year:number, month:number, day:number];
    endDate: [year: number, month: number, day: number];
    amount: number;
    price: number;
    image: string;
    category: string;
}
