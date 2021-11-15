import React, { useMemo, Fragment } from 'react';
import { useProduct } from 'vtex.product-context';
import styles from './styles.css'

const Prueba = () => {
    
    return useMemo(() =>{
        return (
            <h2>HOLA, SEAN BIENVENIDOS A MI CANAL DE YOUTUBE</h2>
        )
    },[])
}
export default Prueba