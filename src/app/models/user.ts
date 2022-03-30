export interface IUser {
    id?: number,
    firstname?:string,
    lastname?: string,
    email: string,
    password: string,
    role?:string
}

export interface IuserDetails {
    user_id: number,
    mobile_number: number,
    first_name: string,
    last_name: string,
    password:string,
    email: string,
    default_address: number
}

export interface IAddress {
    address_id:number,
    user_id:number,
    full_name: string,
    mobile_number: string,
    pin_code: string,
    residency_name: string,
    area: string,
    land_mark: string,
    city: string,
    state: string,
    country: string,
}
