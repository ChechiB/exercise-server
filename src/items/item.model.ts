export interface IItem{
    id: string,
    title: string,
    price: IPrice,
    picture: string,
    condition: string,
    free_shipping: boolean,
    sold_quantity?: Number,
    description?: string,
    breadcrumb?: Array <ICategory>,
};

interface IPrice{
    currency: string,
    amount: number,
    decimals: number,
};

export interface ICategory{
    id: string,
    name: string
}


