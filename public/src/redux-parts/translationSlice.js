import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createHeaders } from '../api/apiFunctions';


const apiUrl = process.env.REACT_APP_API_URL;


//simple function for grabbing the existing translations from a user based of their id.
export const getTranslationsAsync = createAsyncThunk(
    'Translation/getTranslationAsync',
    async (obj) => {
        try {
            //we pass the user obj, and then set the id
            const id = obj.id;

            //we fetch from the url, we defined in our .env which is set above.
            const response = await fetch(`${apiUrl}/${id}`)
            if (!response.ok) {
                throw new Error('Error: User does not Exist.');
            }
            const data = await response.json()
            return [null, data.translations]
        } catch (error) {
            return [error.message, []]
        }
    }
)

//function to add new translations
export const addTranslationAsync = createAsyncThunk(
    'Translation/addTranslationAsync',
    async (obj) => {
        try {
            //we grab out state obj, then we define the id and the translation

            const id = obj.id;
            const translation = obj.translation;

                //then we grab the existing translations by the user.
                const RequestTranslations = await fetch(`${apiUrl}/${id}`)
                if (!RequestTranslations.ok) {
                    throw new Error('Error: User does not Exist.');
                }
                const existingTranslations = await RequestTranslations.json()

                const newTransArr = []

                //we push the existing translations to newTransArr
                existingTranslations.translations.forEach(element => {
                    newTransArr.push(element);
                });
                
                //then we push the new translation to the array
                newTransArr.push(translation);


                //and then we patch the array to the specific user based of the user id.
                const response = await fetch(`${apiUrl}/${id}`, {
                    method: 'PATCH',
                    headers: createHeaders(),
                    body: JSON.stringify({
                        translations: newTransArr
                    })
                })
                if (!response.ok) {
                    throw new Error('Could not add translation: '+translation+' to userid: ' + id);
                }
                const data = await response.json()
                return [null, data]
            
        } catch (error) {
            return [error.message, []]
        }
    }
);

export const Translationslice = createSlice({
    name: 'Translation',
    initialState: {
        username: undefined,
        translations: []
    },
    reducers: {
        addTranslation: (state, action) => {
            const Translation = {
                translations: [action.payload]
            };
            state.translations = Translation;

        },
    },
    extraReducers: {
        [getTranslationsAsync.fulfilled]: (state, action) => {
            return {...state, username: action.payload[1][0].username, translations: action.payload[1][0].translations, id: action.payload[1][0].id }
        },
        [addTranslationAsync.fulfilled]: (state, action) => {
            return {...state, username: action.payload[1].username, translations: action.payload[1].translations, id: action.payload[1].id }
        },
    },
});

export const { addTranslation } = Translationslice.actions;
export default Translationslice.reducer;
