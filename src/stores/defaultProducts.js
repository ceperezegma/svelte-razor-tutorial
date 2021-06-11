import {writable} from 'svelte/store';
import url from '../strapi/URL';
import getProducts from "../strapi/getProducts";
// const store = writable(flattenProducts([...getProducts]));
const store = writable([], () => {
    setProducts();
});

async function setProducts() {
    let products = await getProducts();
    if(products) {
        products = flattenProducts(products);
        store.set(products);
    }
    
}

// subscribe
//set
//update

function flattenProducts(data) {
    return data.map(item => {
        let image = item.image[0].url;
        // let image = `${url}${item.image[0].url}`;        
        return {...item, image};
    })
}

export default store;