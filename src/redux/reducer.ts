import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";


let initialValue = new AppState();
export function reduce(state: AppState = initialValue, action: Action): AppState {

    let newAppState = { ...state }

    switch (action.type) {

        case ActionType.createUser:
            newAppState.user = action.payload;
            break;

        case ActionType.getAllCoupons:
            newAppState.coupons = action.payload 
            break;

        case ActionType.getCouponsByPage:
            newAppState.couponsByPage = action.payload
            break;

        
        case ActionType.login:
            newAppState.user = action.payload
            break;

        case ActionType.deleteCoupon:
            newAppState.coupons = action.payload
            break;
        
        case ActionType.openModal:
            newAppState.openModal = action.payload
            break;

        case ActionType.getCouponById:
            newAppState.coupon = action.payload
            break;
            
        case ActionType.getCouponsSorted:
            newAppState.couponsBySorting = action.payload
            break;
            
        case ActionType.createCustomer:
            newAppState.customer = action.payload
            break;

        case ActionType.getAllCustomers:
            newAppState.customers = action.payload
            break;

        case ActionType.getCouponsByCategory:
            newAppState.couponsByCategory = action.payload
            break;

        case ActionType.isLogedIn:
            newAppState.isLogedIn = action.payload;
            break;

        case ActionType.addItemToCart:
            newAppState.cartItem = action.payload
            break;
        
        case ActionType.getCompanyById:
            newAppState.company = action.payload
    }

    return newAppState

}
export default reduce