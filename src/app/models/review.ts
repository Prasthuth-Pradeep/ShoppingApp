export interface IReview {
    review_id: number,
    user_id: number,
    product_id: number,
    reviews_text: string,
    product_name: string,
    first_name: string
}

export interface IReplay {
    replay_id?: number,
    review_id: number,
    user_id?: number, 
    replay_content: string, 
    first_name: string
}
