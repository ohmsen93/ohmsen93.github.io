import { Files } from "react-bootstrap-icons";
import { useSelector, useDispatch } from 'react-redux';
import { addTranslationAsync, getTranslationsAsync } from '../redux-parts/translationSlice';




const SignOutput = () => {
    const dispatch = useDispatch();

    const translations =  useSelector(state => state.translation.translations)

    const wordToTranslate = translations[translations.length - 1]

    const SignTranslator = (query) => {

        const resultArr = [];

        const queryArr = query.split('');

        const imgDIR = 'individial_signs/'; 

        
        queryArr.forEach(element => {

            resultArr.push(imgDIR+element.toLowerCase()+'.png');
        });
    
        return resultArr;
        
    }


    //const translationPathArr = SignTranslator(wordToTranslate);


    return (
        
        <>
            { (wordToTranslate !== undefined) ? [...wordToTranslate].map(img => (<img srcSet={"individial_signs/" + img + ".png"} style={{width:50, height:50}}/>)) : ""}
        </>
    );
}

export default SignOutput;