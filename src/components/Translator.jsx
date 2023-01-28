import TextInput from "./TextInput";
import SignOutput from "./SignOutput";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Translator = () => {
    const state = useSelector((state) => state);
    const navigate = useNavigate();

    //usercheck
    const userCheck = (user) => {
        if(user !== undefined){
            return true
        } else {
            return false
        }
    }

    //check if the state user's username is set, if not redirect to frontpage.
    useEffect(() => {
        if(userCheck(state.user.username) === false){
            //redirect to frontpage
            console.log("redirect root");
            navigate('/');
        }
    }, [state])


    return (
            <>
                <div id="translationContent" className="p-2">
                    <TextInput/>
                    <SignOutput/>
                </div>
            </>
    )
}

export default Translator;