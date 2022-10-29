import { IUser } from "./IUser";

export interface ICustomer {
    user: {
        username: string;
        password: string;
        firstname: string;
        lastname: string;
        role: string;
    }
    address: string;
    amountOfChildren: string;
    phoneNumber: string;
    birthday: number[];
}
