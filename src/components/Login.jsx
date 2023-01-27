import { useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, addUserAsync } from '../redux-parts/userSlice';


import Logo from '../Resources/Logo.png';
import LogoBg from '../Resources/Splash.svg';


const Login = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log("loginLog: ",(state));


    
    const userCheck = (user) => {
        if(user !== undefined){
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if(userCheck(state.user.username) === true){
            //redirect to translator
            console.log("redirect translator");
            navigate('translator');
        }
    }, [state])


    const onSubmit = data => (
        dispatch(addUserAsync(data.username))

        

    )


    const userNameConfig = {
        required: true,
        minLength: 2
    }

    return (
        <div id="Welcome" className="container col-12">
            <div className="imgContainer">
                <img src={LogoBg} alt="" className="logoImg" id="LogoBg" />
                <img src={Logo} alt="" className="logoImg" id="Logo" />
            </div>
            <div id="WelcomeText">
                <h1>Lost in Translation</h1>
                <h3>Get started</h3>
            </div>
            <form id="LoginContainer" className="form-inline col-8 offset-2 mr rounded-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="input input-group">
                    <div className="input-group-prepend col-1 p-2">
                        <span className="input-group-img">
                            <img src="https://img.icons8.com/ios/100/null/keyboard.png" alt="" style={{ height: 30, width: 30 }} />
                        </span>
                    </div>

                    <input {...register("username", { userNameConfig })} type="text" className="col-10" id="username" aria-describedby="helpId" placeholder="What's your name?" style={{ background: "transparent", color: '#969696', border: 0, fontSize: 25, fontFamily: 'Sanchez' }} />


                    <div className="input-group-append col-1 p-1">
                        <button className="btn btn-outline-light text-right" type="submit" form='LoginContainer' style={{ height: 42, width: 42, borderRadius: 25, backgroundColor: '#845EC2', border: 'None' }}>
                            <Icon.PlayFill color='#FFF' size={32} style={{ marginLeft: -5 }} />
                        </button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default Login;