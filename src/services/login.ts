import { LoginProps } from "../interface/models/interface";

const API_URL: any = process.env.REACT_APP_API_URL;


// Hace la peticion a inicio de sesión
export function login(data: LoginProps) {
    return new Promise((resolve, reject) => {
        const { email, password } = data;
        // fetch ...
        if (email && password) {
            resolve(data);
        } else {
            reject('Error');
        }
    });
};

export function fetchLogout() {
    return new Promise((resolve) => {
        localStorage.removeItem('user');
        localStorage.removeItem('products');
        resolve('Logout');
    });
}