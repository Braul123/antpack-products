import { LoginProps } from "../interface/models/interface";


// Hace la peticion a inicio de sesión
export function login(data: LoginProps) {
    return new Promise((resolve, reject) => {
        const { email, password } = data;
        // fetch ...
        if (email && password) {
            resolve({
                email,
                password
            });
        } else {
            reject('Error');
        }
    });
};