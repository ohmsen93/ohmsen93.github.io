import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createHeaders } from '../api/index';


const apiUrl = process.env.REACT_APP_API_URL;

export const getTranslationsAsync = createAsyncThunk(
    'Translation/getTranslationAsync',
    async (obj) => {
        try {

            const id = obj.id;

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

export const addTranslationAsync = createAsyncThunk(
    'Translation/addTranslationAsync',
    async (obj) => {
        try {

            const id = obj.id;
            const translation = obj.translation;

            console.log("addTranslationAsync: ", translation);

                const RequestTranslations = await fetch(`${apiUrl}/${id}`)
                if (!RequestTranslations.ok) {
                    throw new Error('Error: User does not Exist.');
                }
                const existingTranslations = await RequestTranslations.json()

                const newTransArr = []

                existingTranslations.translations.forEach(element => {
                    newTransArr.push(element);
                });

                newTransArr.push(translation);

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
            console.log("getTranslationPayload: ", action.payload[1][0]);

            return {...state, username: action.payload[1][0].username, translations: action.payload[1][0].translations, id: action.payload[1][0].id }
        
        },
        [addTranslationAsync.fulfilled]: (state, action) => {

            
            console.log("translationPayload: ", action.payload[1]);


            return {...state, username: action.payload[1].username, translations: action.payload[1].translations, id: action.payload[1].id }
            
        },
    },
});

export const { addTranslation } = Translationslice.actions;
export default Translationslice.reducer;
