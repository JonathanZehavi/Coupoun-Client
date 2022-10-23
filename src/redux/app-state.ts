import { ICompany } from "../Model/ICompany";
import { ICoupon } from "../Model/ICoupon";
import { ICustomer } from "../Model/ICustomer";
import { IPurchaseDetails } from "../Model/IPurchaseDetails";


export class AppState {
    public coupons: ICoupon[] = [];
    public couponsByPage: ICoupon[] = [];
    public coupon: ICoupon;
    public couponsBySorting: ICoupon[] = [];
    public openModal: boolean = false;
    public customer: ICustomer;
    public couponsByCategory: ICoupon[] = [];
    public company: ICompany;
    public isLoggedIn: boolean;
    public purchaseId: number;
    public purchaseDetails: IPurchaseDetails;
    
}