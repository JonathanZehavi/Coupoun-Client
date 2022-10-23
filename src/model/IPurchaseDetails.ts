import { ICoupon } from "./ICoupon";

export interface IPurchaseDetails {
    firstname: String;
    lastname: String;
    username: String;
    address: String;
    phoneNumber: String;
    amount: number;
    dateOfPurchase: String;
    coupons: ICoupon[];
}