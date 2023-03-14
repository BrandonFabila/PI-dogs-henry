import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByName, sortByWeight } from '../redux/actions'
import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import Paginado from './Paginado.jsx'
import SearchBar from './SearchBar.jsx'
import styles from '../styles/Home.module.css'


export default function Home() {
    
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, /*_setDogCurrentPerPage*/] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const [, setOrden] = useState('')

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleFilterTemperaments(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterDogsByTemperament(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterOrigin(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterDogsByOrigin(e.target.value))

    }

    function handleSortByWeight(e) {
        e.preventDefault()
        dispatch(sortByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className='home'>
            <div className={styles.NB}>
                <SearchBar/>
                <ul className={styles.navbar}>
                    <li className='content-select'>
                        <select onChange={e => handleSortByName(e)}>
                            <option value="selected" hidden >Ordenado por Nombre</option>
                            <option value="ABC">A - Z</option>
                            <option value="ZYX">Z - A</option>
                        </select>
                    </li>

                    <li className='content-select'>
                        <select onChange={e => handleSortByWeight(e)}>
                            <option value="selected" hidden className='elementNB'>Ordenado por Peso</option>
                            <option value="asc">Mas Livianos</option>
                            <option value="desc">Mas Pesados</option>
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e => handleFilterTemperaments(e)}>
                            <option key={0} value='all'>Todos los Temperamentos</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1
                                if (a.name > b.name) return 1
                                return 0
                            }).map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e => handleFilterOrigin(e)}>
                            <option value="all">All Dogs</option>
                            <option value='api'>API</option>
                            <option value='created'>DB</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div>
            <Paginado  dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
            </div>
            <div className={styles.container}>
                {
                    currentDogs?.map((e) => {
                        return (
                            <div key={e.id} className={styles.cardHome} >
                                <Link to={'/home/' + e.id} style={{ textDecoration: 'none' }}>
                                    <Card
                                        name={e.name}
                                        image={e.image}
                                        temperaments={e.temperaments}
                                        weightMin={e.weightMin}
                                        weightMax={e.weightMax}
                                        key={e.id}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}