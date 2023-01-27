import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const state = useSelector((state) => state);
    const navigate = useNavigate();


    console.log("headerLog: ", state.user)

    const userCheck = (user) => {
        if(user !== undefined){
            return true
        } else {
            return false
        }
    }

    const logout = () => {
        
    }


    return (
        <header className="p-2 col-12">
            <h1 className="col-5 offset-2">Lost in Translation</h1>
            {(userCheck(state.user.username) === true) ? <button onClick={() => navigate('/profile')} id='Profile'>{state.user.username}</button> : '' }

        </header>
    );

}

export default Header;