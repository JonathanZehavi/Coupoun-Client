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
        
    }

    return newAppState

}
export default reduce