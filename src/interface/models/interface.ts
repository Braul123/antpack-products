/**
 * @description Interface de un usuario - son los datods requeridos que debe tener un usuario dentro de la aplicación
 */
export interface LoginProps{
    email: string;
    password: string;
    userName: string;
}

/**
 * @description Interface de un producto - son los datods requeridos que debe tener un producto dentro de la aplicación
 */
export interface Product {
    name: string
    description: string,
    price: number,
    id?: string,
    category: string
}
