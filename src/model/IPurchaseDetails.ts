import { ICoupon } from "./ICoupon";

export interface IPurchaseDetails {
    id: number;
    firstname: String;
    lastname: String;
    username: String;
    address: String;
    phoneNumber: String;
    amount: number;
    dateOfPurchase: number[];
    coupons: ICoupon[];
}