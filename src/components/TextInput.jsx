import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import { useEffect } from 'react';
import { addTranslationAsync } from '../redux-parts/translationSlice';
import { getUserAsync } from '../redux-parts/userSlice';


const TextInput = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const { register, handleSubmit, formState: { errors } } = useForm();

    // i had some issues with a newly signed in user, as we dont set the id locally, only on the api

    // to get a workaround i had to grab the id from the user object which i get from getUserAsync through the username
    useEffect(()=>{
        dispatch(getUserAsync(state.user.username))
    },[])


    let userid = 0;

    //then i check if i can grab the id directly from the translation, if not i grab it from the user
    if(state.user.user !== undefined){
        console.log("user not defined")
        userid = state.user.user[0].id
    } else {
        console.log("user defined")
        userid = state.translation.id;
    }

    // then i submit a user id, along with the translation to addTranslationAsync
    const onSubmit = data => (
        dispatch(addTranslationAsync({id: userid, translation: data.translation}))
    )

    const translationConfig = {
        required: true,
        minLength: 2
    }

    //the form within the return, is done through react-hook-forms.

    return (
            <form id="TranslationContainer" className="form-inline col-8 offset-2 mr rounded-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input input-group">
                        <div className="input-group-prepend col-1 p-2">
                            <span className="input-group-img">
                                <img src="https://img.icons8.com/ios/100/null/keyboard.png" alt="" style={{ height: 30, width: 30 }} />
                            </span>
                        </div>

                        <input {...register("translation", { translationConfig })} type="text" className="col-10" id="translationInput" aria-describedby="helpId" placeholder="Translate to Sign language?" style={{ background: "transparent", color: '#969696', border: 0, fontSize: 25, fontFamily: 'Sanchez' }} />


                        <div className="input-group-append col-1 p-1">
                            <button className="btn btn-outline-light text-right" type="submit" form='TranslationContainer' style={{ height: 42, width: 42, borderRadius: 25, backgroundColor: '#845EC2', border: 'None' }}>
                                <Icon.PlayFill color='#FFF' size={32} style={{ marginLeft: -5 }} />
                            </button>
                        </div>
                    </div>
            </form>

    );
}

export default TextInput;