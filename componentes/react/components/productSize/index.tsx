import React, { Fragment, useContext, useMemo } from 'react';
import { ProductContext } from 'vtex.product-context';
import EnhancedModalTrigger from 'vtex.modal-layout/ModalTrigger';
import ModalRef from 'vtex.modal-layout/Modal';
import ModalHeader from 'vtex.modal-layout/ModalHeader';
import MemoizedRichText from 'vtex.rich-text/index';
import Image from 'vtex.store-image/Image';
import styles from './styles.css';

interface TriggerI {
    triggerText: string,
    triggerColor: string,
    triggerWeight: string
}

interface OptionsI {
    TRIGGER_TITLE: string,
    TRIGGER_COLOR: string,
    TRIGGER_WEIGHT: string
}

const OPTIONS: OptionsI = {
    TRIGGER_TITLE: "Tabla de Talles",
    TRIGGER_COLOR: "#000",
    TRIGGER_WEIGHT: "400"
}

const ProductSize = (props: TriggerI) => {
    const { triggerText, triggerColor, triggerWeight } = props;
    const {product} = useContext(ProductContext);
    // almacena atributo de producto para tabla de talle
    // producto c/atributo para test: https://practicacomponentes--herenciaar.myvtex.com/3837561171hb-remera-hot-ride-307/p
    // prod s/atributo: https://practicacomponentes--herenciaar.myvtex.com/3866621101az-gorra-herencia-108/p?skuId=41258
    const tableName = product?.properties[2]?.values[0];
    console.log('Datos producto:');    
    console.log(tableName);
    
    return useMemo(() => {
        return (
            <>
                {
                    tableName ?
                        <EnhancedModalTrigger>
                            <div className={styles.TriggerTitle} style={{color: triggerColor, fontWeight: triggerWeight}}>
                                <MemoizedRichText text={triggerText} />
                            </div>
                            <ModalRef fullScreen="true">
                                <ModalHeader iconCloseSize="36" />
                                <Image src="https://herenciaar.vteximg.com.br/arquivos/prendas_superiores.jpg" />
                            </ModalRef>
                        </EnhancedModalTrigger>  
                    : <Fragment />
                }
            </>
        )
    }, [props])
}

ProductSize.schema = {
    title: "Product Size - Trigger",
    description: "Ritch text trigger custom",
    type: "object",
    properties: {
        triggerText: {
            title: "Ingresar texto del trigger",
            type: "string",
            default: OPTIONS.TRIGGER_TITLE
        },
        triggerColor: {
            title: "Color del texto",
            description: "# Exadecimal",
            type: "string",
            default: OPTIONS.TRIGGER_COLOR
        },
        triggerWeight: {
            title: "Ingresar algún valor de las descripción",
            description: "300, 400, 500, 600, 700",
            type: "string",
            default: OPTIONS.TRIGGER_WEIGHT
        }
    }
}

ProductSize.defaultProps = {
    triggerText: OPTIONS.TRIGGER_TITLE,
    triggerColor: OPTIONS.TRIGGER_COLOR,
    triggerWeight: OPTIONS.TRIGGER_WEIGHT
}

export default ProductSize;