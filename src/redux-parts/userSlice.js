import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createHeaders } from '../api/index';


const apiUrl = process.env.REACT_APP_API_URL;

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

export const addUserAsync = createAsyncThunk(
    'User/addUserAsync',
    async (username) => {
        try {
            const check = await fetch(`${apiUrl}?username=${username}`)
            if (!check.ok) {
                throw new Error('Error: User does not Exist.');
            }

            const data = await check.json();

            if(data.length > 0){
                console.log("Exists check: ", data[0]);
                return [null, data[0],'set']
            } else {
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
        addUser: (state, action) => {
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
        [addUserAsync.fulfilled]: (state, action) => {

            console.log("state: ", action.payload[2]);

            if(action.payload[2] === 'set'){
                console.log("setObj: ", action.payload[1]);
                
                //state.user = action.payload[1];

                // SETS EXISTING USER

                return {...state, username: action.payload[1].username, translations: action.payload[1].translations, id: action.payload[1].id }
                
            } else {

                // ADDS NEW USER
                return {...state, username: action.payload[1].username}
            }
        },
    },
});

export const { addUser, clearUser } = Userslice.actions;
export default Userslice.reducer;