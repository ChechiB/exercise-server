import axios from 'axios';
import { getDecimals } from '../utils/utils';
import { IItem, ICategory } from './item.model';
import { HttpException } from '../utils/errorHandler'


interface IResponse {
    author: {
        name:string,
        lastname: string,
    },
    item: IItem,
}

export async function get(id: string){
    
    const [ item, desc ] = await Promise.all([
        axios.get(`https://api.mercadolibre.com/items/${id}`),
        axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]).catch( e => {
        throw new HttpException('404','resource not found');
    })

    const category: string = item.data.category_id;
    const breadcrumb = await axios.get(`https://api.mercadolibre.com/categories/${category}`);

    let resp: IResponse = {
        author: {
            name: "Yesi",
            lastname: "Barroso"
            },
        item: {
            id: item.data.id,
            title: item.data.title,
            price: {
                currency: item.data.currency_id,
                amount: Math.trunc(item.data.price),
                decimals: getDecimals(item.data.price),
            },
            picture: item.data.thumbnail,
            condition: item.data.condition,
            free_shipping: item.data.shipping.free_shipping,
            sold_quantity: item.data.sold_quantity,
            description: desc.data.plain_text,
            breadcrumb: breadcrumb.data.path_from_root,
        }
    }
    return resp;    

}

export async function list(search){
    const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${search}`,
        {
            params: { limit: 4}
        }).catch ( e => {
            throw new HttpException('404','resource not found');
        });

    const author = {
        name: "Yesica",
        lastname: "Barroso"
    }

    const results = resp.data.results;
    if (results){
        return {
            author: author,
            categories: [],
            items: []
        };
    }

    const category: string = results[0].category_id;    
    const breadcrumb = await axios.get(`https://api.mercadolibre.com/categories/${category}`).catch ( e => {
        throw new HttpException('404','resource not found');
    });;

    const items = [];    
    results.forEach(result => {
        let item: IItem = {
            id: result.id,
            title: result.title,
            price: {
                currency: result.currency_id,
                amount: Math.trunc(result.price),
                decimals: getDecimals(result.price),
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
        }
        items.push(item);
    });
    
    const categories: ICategory = breadcrumb.data.path_from_root;
    
    const resultSearch = {
        author: author,
        categories: categories,
        items: items
    }

    return resultSearch;
}