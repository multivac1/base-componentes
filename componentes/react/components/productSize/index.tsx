import React, { useContext, useMemo } from 'react';
import { ProductContext } from 'vtex.product-context';
import EnhancedModalTrigger from 'vtex.modal-layout/ModalTrigger';
import ModalRef from 'vtex.modal-layout/Modal'
import MemoizedRichText from 'vtex.rich-text/index';
//import styles from './styles.css';

const ProductSize = () => {
    const {product} = useContext(ProductContext);
    // almacena atributo de producto para tabla de talle
    // producto para test: https://practicacomponentes--herenciaar.myvtex.com/3837561171hb-remera-hot-ride-307/p
    const properties = product?.properties[2]?.values[0];
    console.log('Datos producto:');    
    console.log(properties);
    
    /* <EnhancedModalTrigger>
            rich-text
    </EnhancedModalTrigger>  */

    return useMemo(() => {
        return (
            <>
                {
                <EnhancedModalTrigger>
                        <MemoizedRichText text="PRUEBA TRIGGER" />
                        <ModalRef fullScreen="true" />
                </EnhancedModalTrigger>  
                }
            </>
        )
    }, [])
}

export default ProductSize;