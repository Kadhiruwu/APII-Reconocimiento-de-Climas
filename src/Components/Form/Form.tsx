import { useState } from "react";
import type { SearchType } from "../../types";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import Alert from "../Alert/Alert";

type formProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : formProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(Object.values(search).includes('')){
            setAlert('Todos los campos son Obligatorios');
            return
        }

        fetchWeather(search)
    }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        {alert && <Alert>{alert}</Alert>}

        <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>
            <input type="text" name="city" 
            id="city" value={search.city}
            placeholder="Escribe una ciudad" onChange={handleChange}/>
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais</label>
            <select name="country" id="country" onChange={handleChange} value={search.country}>
                <option value="">-- Seleccione un Pais --</option>
                {countries.map(country => (
                    <option 
                    key={country.code}
                    value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>

        <input className={styles.submit} type="submit" value='Consultar Clima' />
    </form>
  )
}
