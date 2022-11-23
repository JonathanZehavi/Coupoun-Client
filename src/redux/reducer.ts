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


        case ActionType.openModal:
            newAppState.openModal = action.payload
            break;

        case ActionType.openCompanyModal:
            newAppState.openCompanyModal = action.payload
            break;

        case ActionType.openUserModal:
            newAppState.openUserModal = action.payload
            break;

        case ActionType.getCouponById:
            newAppState.coupon = action.payload
            break;

        case ActionType.getCouponsByCategory:
            newAppState.couponsByCategory = action.payload
            break;

        case ActionType.getAllUsers:
            newAppState.users = action.payload
            break;

        case ActionType.getUsersByPage:
            newAppState.usersByPage = action.payload
            break;

        case ActionType.getUserById:
            newAppState.user = action.payload
            break;

        case ActionType.isLoggedIn:
            newAppState.isLoggedIn = action.payload
            break;

        case ActionType.getPurchaseId:
            newAppState.purchaseId = action.payload
            break;

        case ActionType.getAllPurchasesDetails:
            newAppState.purchasesDetails = action.payload
            break;
        case ActionType.getAllPurchasesDetailsByPage:
            newAppState.purchasesDetailsByPage = action.payload
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