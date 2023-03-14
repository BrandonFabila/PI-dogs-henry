import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleaner, cleanDog, deleteDog} from '../redux/actions'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from '../styles/Detail.module.css'


export default function Detail(props) {

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
 
    useEffect(() => {
         dispatch(getDetail(id))
         dispatch(cleaner())
         dispatch(cleanDog())
     }, [dispatch, id])



    const myDog = useSelector((state) => state.detail)

    function handleDelete(e) {
        if (id.length > 5) {
            e.preventDefault()
            dispatch(cleanDog())
            dispatch(deleteDog(id))
            dispatch(cleaner())
            alert('La raza fue eliminada')
            navigate('/home')
        }else{
            alert('Solo podemos eliminar las razas creadas por usted.')
        }
    }

    console.log(myDog)
           

    return (
        <div className={styles.divDetail}>
            <SearchBar/>
            <button onClick={(e) => handleDelete(e)}className="welcome"><span>Borrar Perro</span></button> 

            {
            
                myDog.length > 0 ?
                    <div>
                        <h1 className={styles.text}>{myDog[0].name}</h1>
                        <ul className={styles.asd}>
                            <li>
                                <div>
                                    <img src={myDog[0].image} alt={myDog[0].name} className={styles.image} />
                                </div>
                            </li>
                            <li className={styles} >
                                <div>
                                    <h2 className={styles.caracts}>Temperamentos:</h2>
                                    <ul >
                                        {myDog[0].CreatedInDB ?
                                            myDog[0].temperaments.map(e => {
                                                return <li key={e.race_temperament.temperamentId}><label className={styles.text} >{e.name}</label></li>
                                            }) :
                                            myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(e => {
                                                    return <li key={e}><label className={styles.text} >{e}</label></li>
                                                }) :
                                                'Esta raza no posee temperamentos'
                                        }

                                    </ul>

                                    <h2 className={styles.caracts}>Altura entre: </h2>
                                    <p className={styles.text} >{myDog[0].heightMin} a {myDog[0].heightMax} Cm.</p>
                                    <h2 className={styles.caracts}>Peso entre:</h2>
                                    <p className={styles.text} >{myDog[0].weightMin} a {myDog[0].weightMax} Kg.</p>
                                    <h2 className={styles.caracts}>Esperanza de vida:</h2>
                                    <p className={styles.text}>{myDog[0].life_span}</p>
      
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div className="loading">
                        <h1><strong>Cargando...</strong></h1>
                    </div>
                                   }

        </div>
    )
}