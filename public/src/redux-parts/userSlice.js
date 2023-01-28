import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createHeaders } from '../api/apiFunctions';


const apiUrl = process.env.REACT_APP_API_URL;

//simple function for getting a user based of their username.
export const getUserAsync = createAsyncThunk(
    'User/getUserAsync',
    async (username) => {
        try {
            const response = await fetch(`${apiUrl}?username=${username}`)
            if (!response.ok) {
                throw new Error('Error: User does not Exist.');
            }
            const data = await response.json()
            return [null, data]
        } catch (error) {
            return [error.message, []]
        }
    }
)

// function for loggin in the user, it checks if they exists, it not they create them before logging in.
export const loginUserAsync = createAsyncThunk(
    'User/loginUserAsync',
    async (username) => {
        try {
            //first we check if the user exists.
            const check = await fetch(`${apiUrl}?username=${username}`)
            if (!check.ok) {
                throw new Error('Error: User does not Exist.');
            }

            const data = await check.json();
            //if they do, we return the user with the set state.
            if(data.length > 0){
                console.log("Exists check: ", data[0]);
                return [null, data[0],'set']
            } else {
                //else we create a new user, and pass it along with the create state
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: createHeaders(),
                    body: JSON.stringify({
                        username,
                        translations: []
                    })
                })
                if (!response.ok) {
                    throw new Error('Could not create user with username ' + username);
                }
                const data = await response.json()
                console.log("NoExist check: ", data);
                return [null, data,'create']
            }
        } catch (error) {
            return [error.message, []]
        }
    }
);

export const Userslice = createSlice({
    name: 'User',
    initialState: {
        username: undefined,
        translations: []
    },
    reducers: {
        loginUser: (state, action) => {
            const User = {
                username: action.username,
                translations: []
            };


            state = User;
        },
        clearUser: (state, action) => {
            return {
                username: undefined,
                translations: []
            }
        }
    },
    extraReducers: {
        [getUserAsync.fulfilled]: (state, action) => {
            console.log("getUserPayload: ", action.payload[1][0]);

            state.user = action.payload[1];
        
        },
        [loginUserAsync.fulfilled]: (state, action) => {

            console.log("state: ", action.payload[2]);

            // here we then either set the user, or create it based of the state from our loginUserAsync function.
            if(action.payload[2] === 'set'){
                

                // SETS EXISTING USER

                return {...state, username: action.payload[1].username, translations: action.payload[1].translations, id: action.payload[1].id }
                
            } else {
                // ADDS NEW USER
                return {...state, username: action.payload[1].username, translations: []}
            }
        },
    },
});

export const { loginUser, clearUser } = Userslice.actions;
export default Userslice.reducer;