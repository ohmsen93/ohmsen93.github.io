import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux-parts/userSlice';


const Profile = () => {
    const dispatch = useDispatch(); 
    const state = useSelector((state) => state);
    const navigate = useNavigate();

    //here we grab the translation list from our redux state
    const translationsToList =  useSelector(state => state.translation.translations)

    // usercheck to see if the user is set
    const userCheck = (user) => {
        if (user !== undefined) {
            return true
        } else {
            return false
        }
    }

    // redirect the user to frontpage if the user is not set, through navigate.
    useEffect(() => {
        if (userCheck(state.user.username) === false) {
            //redirect to frontpage
            console.log("redirect root");
            navigate('/');
        }
    }, [state])

    // function for the logout functionality.
    const handleLogOutClicked = () => {
        dispatch(clearUser())
        navigate("/")
    }

    // in our return we display our translations in a list via <li>, we slice(-10) to get the last 10 translations
    return (
        <div id="profile">
            <button onClick={() => navigate('/translator')} id='Translator btn' className='btn btn-primary col-6'>To translator</button>
            <button onClick={handleLogOutClicked} className='btn btn-secondary col-6'>logout</button>
            <label htmlFor="translationList">Translation History</label>
            <ul className='translationList col list-group' style={{backgroundColor:'#999'}}>
                { (translationsToList !== undefined) ? [...translationsToList].slice(-10).map(translation => (<li className='list-group-item' >{translation}</li>)) : ""}
            </ul>
        </div>
    )
}

export default Profile; 