
export interface IProduct {
    product_id : number,
    product_name : string,
    categories_id : number,
    brand_id : number,
    product_photo_url : string,
    product_rating : number,
    product_stock : number,
    mrp:string,
    categories_name : string,
    brand_name : string,
    estimated_delivery_date: string
}

export interface IBrand {
    brand_id: number,
    brand_name: string,
    category_of_products: ICategory[]
}

export interface ICategory {
    category_id: number,
    category_name: string
}

export interface IWishlist {
    wishlist_id: number,
    user_id: number,
    product_id: number,
    wishlist_flag:number
}

export interface ICategory {
    category_id: number,
    category_name: string
}

export interface IOrderTotal{
    mrp:number,
    total_amount:number
} 

export interface IProductDetails{
    id: number, 
    product_id: number,
    processor: string,
    processor_details: String,
    type: string,
    storage: string,
    display: string,
    weight: number,
    os: string,
    color: string,
    product_name:string,
    product_photo_url: string,
    stocks_left: number
}
