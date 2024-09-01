
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
};

export const userSlice = createSlice(
    {
        name: "userSlice",
        initialState,
        reducers: {
            // Guarda la información del usuario
            setUser: (state, actions) => {
                state.user = actions.payload;
                // Guadar la informacion en el localstorage convertida en base 64
                localStorage.setItem('user', btoa(JSON.stringify(actions.payload)));
            }
        }
    }
)

export const { setUser } = userSlice.actions;
export default userSlice.reducer;