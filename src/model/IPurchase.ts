import { ICoupon } from "./ICoupon";

export interface IPurchase {
    customerId: number;
    totalPrice:number;
    coupons: ICoupon[];
}