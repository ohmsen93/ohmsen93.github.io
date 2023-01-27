import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux-parts/userSlice';


const Profile = () => {
    const dispatch = useDispatch(); 
    const state = useSelector((state) => state);
    const navigate = useNavigate();

    const userCheck = (user) => {
        if (user !== undefined) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (userCheck(state.user.username) === false) {
            //redirect to frontpage
            console.log("redirect root");
            navigate('/');
        }
    }, [state])

    const getTranslationsList = (translations) => {

        const transArr = []
        let limit = ((translations.length < 10) ? translations.length : 10);

        for (let translation = 0; translation < translations.length; translation++) {
            const element = translations[translation];
            transArr.push(element);
        }


        return transArr.slice((translations.length - limit),translations.length);
    }

    const translationList = getTranslationsList(state.user.translations);

    console.log("translationList: ",translationList);

    const handleLogOutClicked = () => {
        dispatch(clearUser())
        navigate("/")
    }

    return (
        <div id="profile">
            <button onClick={() => navigate('/translator')} id='Translator btn'>To translator</button>
            <button onClick={handleLogOutClicked}>logout</button>
            <ul>
                {translationList.map(translation => (<li>{translation}</li>))}
            </ul>
        </div>
    )
}

export default Profile;