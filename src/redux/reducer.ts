import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";


let initialValue = new AppState();
export function reduce(state: AppState = initialValue, action: Action): AppState {

    let newAppState = { ...state }

    switch (action.type) {

        case ActionType.getAllCoupons:
            newAppState.coupons = action.payload 
            break;

        case ActionType.getCouponsByPage:
            newAppState.couponsByPage = action.payload
            break;
        
        case ActionType.getCouponsSortedBy:
            newAppState.couponsBySorting = action.payload
            break;
        
        case ActionType.openModal:
            newAppState.openModal = action.payload
            break;

        case ActionType.getCouponById:
            newAppState.coupon = action.payload
            break;
            
        case ActionType.createCustomer:
            newAppState.customer = action.payload
            break;

        case ActionType.getCouponsByCategory:
            newAppState.couponsByCategory = action.payload
            break;

        case ActionType.isLoggedIn:
            newAppState.isLoggedIn = action.payload
            break;
        
        case ActionType.getPurchaseId:
            newAppState.purchaseId = action.payload
            break;

        case ActionType.getPurchaseDetails:
            newAppState.purchaseDetails = action.payload
            break;
        
        case ActionType.getAllCompanies:
            newAppState.companies = action.payload
            break;

        case ActionType.getCompaniesByPage:
            newAppState.companiesByPage = action.payload
            break;
        
        case ActionType.getCompanyById:
            newAppState.company = action.payload
            break;

        case ActionType.getPageNumber:
            newAppState.pageNumber = action.payload
            break;

        case ActionType.getCouponsByCompanyId:
            newAppState.couponsByCompanyId = action.payload
            break;
        
    }

    return newAppState

}
export default reduce