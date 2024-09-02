
import { Product } from "../interface/models/interface";
import { getProductsStorage } from "./utils";


/**
 * @function fetchNewProductDefault
 * @description Agrega un producto por defecto a la colección de productos
 * @param data
 * @returns 
 */
export function fetchNewProductDefault() {
    return new Promise(async (resolve) => {
        const uniqueid = JSON.stringify(Math.random()).slice(2, 6);
        const newProduct: Product = {
            id: uniqueid,
            name: `Nuevo producto ${uniqueid}`,
            description: "Descubre la excelencia en cada detalle con nuestro innovador producto. Diseñado para satisfacer tus necesidades y elevar tu experiencia.",
            price: 200000,
            category: "General"
        }
        resolve(newProduct);
    })
}

/**
 * @function fetchSaveNewProduct
 * @description Crea un producto y retorna el resultado
 */
export function fetchSaveNewProduct(data: Product) {
    return new Promise(async (resolve) => {
        const uniqueid = JSON.stringify(Math.random()).slice(2, 6);
        const newProduct: Product = {
            ...data,
            id: uniqueid
        }
        resolve(newProduct);
    })
}

/**
 * @function fetchEditProduct
 * @description Edita un producto y retorna el resultado
 */
export function fetchEditProduct(data: Product) {
    return new Promise(async (resolve) => {
        resolve(data);
    })
}

/**
 * @function fetchGetProducts
 * @description Obtiene los productos de acuerdo al paginador
 */
export function fetchGetProducts(skip: number, limit: number, search: any) {
    return new Promise(async (resolve) => {
        const products: any[] = await getProductsStorage();
        let temporalData = products;
        const _search = search ? search : '';
        if (_search) {
            const searchGet = products.filter(
                (prod: any) =>
                    prod.name.toLowerCase().includes(_search.toLowerCase()) ||
                    prod.category.toLowerCase().includes(_search.toLowerCase()));
            resolve(searchGet);
        } else {
            // identifica hasta que indice debe ir el paginador
            let toIndexFilter = skip + limit;
            // Si es mayor a la logitud del arreglo obtiene todo
            if (toIndexFilter > temporalData.length) {
                toIndexFilter = temporalData.length;
            }
            // Obtiene dos datos
            const filter = temporalData.slice(skip, toIndexFilter);
            resolve(filter);
        }
    })
}

/**
 * @description Obtiene un producto por su id
 */
export function fetchGetProductById(id: any) {
    return new Promise(async (resolve) => {
        const products: any[] = await getProductsStorage();
        const product = products.find((prod: any) => prod.id === id);
        resolve(product);
    })
}