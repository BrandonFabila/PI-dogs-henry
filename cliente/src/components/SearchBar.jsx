import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../redux/actions";
import styles from '../styles/SearchBar.module.css'
import { Link } from "react-router-dom";

export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        var found = getDogs(name)
        if (!name) {
            return alert('Debe ingresar nombre')
        }
        dispatch(found)
        setName('')
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    return (
        <div className={styles.cont} >
            <ul className={styles.buts}>
                <li>
                    <Link to='/home'><button className={styles.button}>Home</button></Link>
                </li>
                <li>
                    <button className={styles.button} onClick={e => { handleClick(e) }}><span>Actualizar</span></button>
                </li>
                <li>
                    <Link to='/dogs' ><button className={styles.button}><span>Crear Perro</span></button></Link>
                </li>

            <div className={styles.searchtwo} >
            <div className={styles.inp} >
                <input
                    type='text'
                    placeholder='Busca una raza'
                    onChange={e => handleInputChange(e)}
                    value={name}
                    className={styles.input}
                    onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                    />  
            </div>
            <div>
                <button
                    type='submit'
                    onClick={e => handleSubmit(e)}
                    className={styles.buttonBuscar}
                    >
                    Buscar
                </button>
            </div>
            </div>    
            </ul>
        </div>
    )
}
