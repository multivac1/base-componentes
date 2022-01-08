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
    triggerWeight: number,
    attributeName: string
}

interface OptionsI {
    TRIGGER_TITLE: string,
    TRIGGER_COLOR: string,
    TRIGGER_WEIGHT: number,
    ATTRIBUTE_NAME: string 
}

const OPTIONS: OptionsI = {
    TRIGGER_TITLE: "Tabla de Talles",
    TRIGGER_COLOR: "#000",
    TRIGGER_WEIGHT: 400,
    ATTRIBUTE_NAME: ""
}

const ProductSize = (props: TriggerI) => {
    let { triggerText, triggerColor, triggerWeight, attributeName } = props;
    const {product} = useContext(ProductContext);
    // almacena atributo de producto para tabla de talle
    // producto c/atributo para test prendas superiores: https://practicacomponentes--herenciaar.myvtex.com/3837561171hb-remera-hot-ride-307/p
    // producto test boys: https://practicacomponentes--herenciaar.myvtex.com/3861161171cr-remera-rat-rod-317/p
    // prod s/atributo: https://practicacomponentes--herenciaar.myvtex.com/3866621101az-gorra-herencia-108/p?skuId=41258
    let properties = product?.properties;
    let filteredAtribute = properties?.filter(property => property?.name == "Tabla de talles").map(item => (
        item?.values[0]
    ));
    let tableName = filteredAtribute?.toString().toLowerCase().replace(/ /g, ""); 
    const arrayName = attributeName?.split(',');

    console.log('tableName');
    console.log(tableName);

    console.log('arrayName');
    console.log(arrayName);

    console.log('resultado');
    console.log(arrayName.includes(tableName));
    
    return useMemo(() => {
        return (
            <>
                {
                   arrayName.includes(tableName)  ?
                        <EnhancedModalTrigger>
                            <div className={styles.TriggerTitle} style={{color: triggerColor, fontWeight: triggerWeight}}>
                                <MemoizedRichText text={triggerText} />
                            </div>
                            <ModalRef fullScreen="true">
                                <ModalHeader iconCloseSize="36" />
                                <Image src={`https://herenciaar.vteximg.com.br/arquivos/${tableName}.jpg`} />
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
            type: "number",
            default: OPTIONS.TRIGGER_WEIGHT
        },
        attributeName: {
            title: "Nombre del atributo",
            description: "sin espacios y en minúsculas. Ej: prendassuperiores",
            type: "string",
            default: OPTIONS.ATTRIBUTE_NAME
        }
    }
}

ProductSize.defaultProps = {
    triggerText: OPTIONS.TRIGGER_TITLE,
    triggerColor: OPTIONS.TRIGGER_COLOR,
    triggerWeight: OPTIONS.TRIGGER_WEIGHT,
    attributeName: OPTIONS.ATTRIBUTE_NAME
}

export default ProductSize;