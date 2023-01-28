import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const state = useSelector((state) => state);
    const navigate = useNavigate();



// function to check if the user is set, so that we can set the name within the profile button
    const userCheck = (user) => {
        if(user !== undefined){
            return true
        } else {
            return false
        }
    }

// within our return we check wether the user is set or not through a terenary operator, and then display the profile button

    return (
        <header className="p-2 col-12">
            <h1 className="col-5 offset-2">Lost in Translation</h1>
        
            {(userCheck(state.user.username) === true) ? <button className='btn btn-primary' onClick={() => navigate('/profile')} id='Profile'>Profile: {state.user.username}</button> : '' }

        </header>
    );

}

export default Header;