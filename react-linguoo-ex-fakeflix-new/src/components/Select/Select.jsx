import "./select.scss";
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
const InputSelect = () =>{
   
    const [t, i18n] = useTranslation("global")
      const  options = [
            {label : 'Español' , value : 'es'},
            {label: 'Ingles', value : 'en'}
        ]
    const handleSelectChange = (event) =>{
         i18n.changeLanguage(`${event.value}`)
    }    
    return(
        <>
            <div className="Select__Input_lenguaje">
                <h1>{t()}</h1>
                <Select
                className='Select__Input'
                defaultValue={{label : 'Español' , value : 'es'}}
                    options={options}
                    onChange = {handleSelectChange}
                />
            </div>
        </>
    )
}
export default InputSelect