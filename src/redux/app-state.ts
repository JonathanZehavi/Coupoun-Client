import { ICoupon } from "../Model/ICoupon";
import { ICustomer } from "../Model/ICustomer";
import { IUser } from "../Model/IUser";

export class AppState {
    public coupons:ICoupon[] = [];
    public couponsByPage:ICoupon[] = [];
    public users:IUser[] = []; 
    public coupon:ICoupon;
    public couponsBySorting:ICoupon[] = [];
    public user:IUser;
    public openModal:boolean = false;
    public customer:ICustomer;
    public customers:ICustomer[] = []
    public couponsByCategory:ICoupon[] = [];
    public isLogedIn: boolean = false
}