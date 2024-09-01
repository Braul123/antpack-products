import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: []
};

export const productsSlice = createSlice(
    {
        name: "productsSlice",
        initialState,
        reducers: {
            // Agrega toda una colección de productos
            setAllProducts: (state, actions) => {
                state.products = actions.payload;
            },
            // Guarda los prodcutos en el state de la aplicación
            saveNewProduct: (state, actions) => {
                let _products: any = state.products;
                const _newProduct = actions.payload;
                _products.unshift(_newProduct);
                // Guarda la data en el localstorage para mantenerla
                state.products = _products;
                saveDataInStorage(_products);
            },
            // Edita un producto
            updateProductById: (state, actions) => {
                let _products: any = state.products;
                const _editedProduct = actions.payload;
                // Obtiene la posicion del producto dentro de la colección
                const indexOfProduct = _products.findIndex((prod: any) => prod.id === _editedProduct.id);
                // Remplaza la información
                _products[indexOfProduct] = _editedProduct;
                state.products = _products;
                saveDataInStorage(_products);
            },
            deleteProduct: (state, actions) => {
                const actualProducts: any = state.products;
                let _products: any = [];
                const _deletedProduct = actions.payload;
                
                for (let index = 0; index <= actualProducts.length-1; index++) {
                    if (actualProducts[index].id !== _deletedProduct.id) {
                        _products.push(actualProducts[index]);
                    }
                }
                if (_products.length === 0) {
                    deleteItemStorage();
                } else {
                    saveDataInStorage(_products);
                }
                state.products = _products;
            }
        }
    }
)

export const { setAllProducts, saveNewProduct, updateProductById, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;

// Guarda los productos en el storage de la aplicación
function saveDataInStorage(data: any) {
    if (data && data.length > 0) {
        localStorage.setItem("products", btoa(JSON.stringify(data)));
    }
}

// Elimina la coleccion del storage de la aplicación
function deleteItemStorage() {
    localStorage.removeItem("products");
}