
/**
 * obtiene los productos del localstorage
 */
export function getProductsStorage() {
    const products: any = localStorage.getItem("products");
    if (products) {
        const resolve = JSON.parse(atob(products));
        return resolve
    } else {
        return []
    }
}