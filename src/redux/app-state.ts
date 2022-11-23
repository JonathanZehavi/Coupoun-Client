import { ICompany } from "../Model/ICompany";
import { ICoupon } from "../Model/ICoupon";
import { ICustomer } from "../Model/ICustomer";
import { IPurchaseDetails } from "../Model/IPurchaseDetails";
import { IUser } from "../Model/IUser";


export class AppState {
    public coupons: ICoupon[] = [];
    public couponsByPage: ICoupon[] = [];
    public coupon: ICoupon;
    public couponsBySorting: ICoupon[] = [];
    public openModal: boolean = false;
    public openCompanyModal: boolean = false;
    public openUserModal: boolean = false;
    public customer: ICustomer;
    public users: IUser[] = [];
    public usersByPage: IUser[] = [];
    public user: IUser;
    public couponsByCategory: ICoupon[] = [];
    public company: ICompany;
    public isLoggedIn: boolean;
    public purchaseId: number;
    public purchaseDetails: IPurchaseDetails;
    public purchasesDetails: IPurchaseDetails[] = [];
    public purchasesDetailsByPage: IPurchaseDetails[] = [];
    public companies: ICompany[] = []
    public companiesByPage: ICompany[] = []
    public pageNumber: number = 0
    public category: string
    public couponsByCompanyId: ICoupon[] = []

}