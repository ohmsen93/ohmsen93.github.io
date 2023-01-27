import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import { useEffect } from 'react';
import { getTranslationsAsync, addTranslationAsync } from '../redux-parts/translationSlice';


const TextInput = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => (

        dispatch(addTranslationAsync({id: user.user.id, translation: data.translation}))

    )
    const translationConfig = {
        required: true,
        minLength: 2
    }

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