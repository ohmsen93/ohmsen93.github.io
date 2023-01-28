import { useSelector } from 'react-redux';

const SignOutput = () => {

    let translations =  useSelector(state => state.translation.translations)

    //we grab the translations from the user
    const userTranslations = useSelector(state => state.user.translations)  

    //then we check if the translation state has translations, otherwise we grab them from the user state
    if(translations === undefined){
        translations = userTranslations;
    }

    // we grab the last word translated
    const wordToTranslate = translations[translations.length - 1]

    //in our return we grab our array, seperate it out into chars, and then map to individual <img> tags
    return (
        
        <>
            <div id="signBox" className="p-5 mt-5 rounded col-8 offset-2">
                { (wordToTranslate !== undefined) ? [...wordToTranslate].map(img => (<img srcSet={"individial_signs/" + img + ".png"} style={{width:50, height:50}}/>)) : ""}
            </div>
        </>
    );
}

export default SignOutput;