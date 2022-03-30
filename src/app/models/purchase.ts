export interface ICart {
    cart_id:number,
    user_id:number,
    product_id:number,
    product_name:string,
    product_photo_url:string,
    mrp:number,
    stocks_left:number,
    name:string
}

export interface IOrder {
    order_id:number,
    product_id: number,
    product_quantity:number,
    order_date:string,
    order_time:string,
    delivery_date:string,
    address_id:number,
    user_id:number,
    full_name?:string,
    mobile_number:number,
    pin_code:number,
    residency_name:string,
    area:string,
    land_mark:string,
    city:string,
    state:string,
    country:string,
    product_name:string,
    mrp:number,
    product_photo_url:string,
    first_name:string,
    last_name:string,
    email:string,
    order_total:number,
    arriving_in:number,
    cancel_order:number
}
