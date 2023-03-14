import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/LandingPage.module.css'
// import imagen from '../styles/PerroLanding.png'

export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <div className={styles.inf}>
                <h1 className={styles.text} >Bienvenidos</h1>
                <h2 className={styles.text} >Dogs | PI Soy Henry</h2>
                <h6 className={styles.text} >Desarrollado por Brandon Fabila</h6>
            </div>
            <div className={styles.cont} >
                <Link to='/home'><button className={styles.button}>INGRESAR</button></Link>
            </div>
        </div>


    )
}