import React, { useMemo, Fragment } from 'react';
import { useProduct } from 'vtex.product-context';
import styles from './styles.css'

const NicoTest = () => {
    
    return useMemo(() =>{
        return (
            <h2 className={styles.ComponentTitle}>Hola Nico!</h2>
        )
    },[])
}
export default NicoTest