import TextInput from "./TextInput";
import SignOutput from "./SignOutput";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Translator = () => {
    const user = useSelector((state) => state);
    const navigate = useNavigate();

    const userCheck = (user) => {
        if(user !== undefined){
            return true
        } else {
            return false
        }
    }



    useEffect(() => {
        if(userCheck(user.user) === false){
            //redirect to frontpage
            console.log("redirect root");
            navigate('/');
        }
    }, [user])


    return (
            <>
                <TextInput/>
                <SignOutput/>
            </>
    )
}

export default Translator;