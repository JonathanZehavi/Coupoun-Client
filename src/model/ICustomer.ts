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
    amountOfChildren: number;
    phoneNumber: string;
    birthday: number[];
}
