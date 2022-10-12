import { ReactChild, ReactChildren } from "react";
import { ReactNode } from "react";

export interface ICoupon {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    amount: number;
    price: number;
    image: string;
    category: string;
    companyId: number;
}
