import React, { Fragment, useContext, useMemo } from 'react';
import { ProductContext } from 'vtex.product-context';
import EnhancedModalTrigger from 'vtex.modal-layout/ModalTrigger';
import ModalRef from 'vtex.modal-layout/Modal';
import ModalHeader from 'vtex.modal-layout/ModalHeader';
import MemoizedRichText from 'vtex.rich-text/index';
import Image from 'vtex.store-image/Image';
import { useRuntime } from 'vtex.render-runtime';
//import styles from './styles.css';

interface ITrigger {
    triggerText: string,
    triggerColor: string,
    triggerWeight: number,
    arrayField: IArrayField[]
}

interface IArrayField {
    title: string,
    type: string,
    items: IItems
}

interface IItems {
    title: string,
    type: string,
    properties: {nombreTabla:IItemProperties, imagenTabla:IItemProperties}
}

interface IItemProperties {
    title: string,
    description: string,
    type: string,
    widget?: {"ui:widget": string}
}

interface IInitialvalues {
    TRIGGER_TITLE: string,
    TRIGGER_COLOR: string,
    TRIGGER_WEIGHT: number 
}

const INITIALVALUES: IInitialvalues = {
    TRIGGER_TITLE: "Tabla de Talles",
    TRIGGER_COLOR: "#000",
    TRIGGER_WEIGHT: 400
}

const ProductSize = (props: ITrigger) => {
    //let {product} = useContext(ProductContext);
    let { /* triggerText, triggerColor, triggerWeight */ arrayField } = props;
    const runtime = useRuntime();
    // producto c/atributo para test prendas superiores: https://practicacomponentes--herenciaar.myvtex.com/3837561171hb-remera-hot-ride-307/p
    // producto test boys: https://practicacomponentes--herenciaar.myvtex.com/3861161171cr-remera-rat-rod-317/p
    // prod s/atributo: https://practicacomponentes--herenciaar.myvtex.com/3866621101az-gorra-herencia-108/p?skuId=41258
    //let properties = product?.properties;
    //let filteredAtribute = properties?.filter((property:any) => property?.name == "Tabla de talles").map((item:any) => (item?.values[0]));
    //let tableName = filteredAtribute?.toString().toLowerCase().replace(/ /g, ""); 
   // let arrayNames = attributeName?.split(',');

    console.log('Nombre tablita');
    console.log(props);

    console.log('Test:');
    console.log(arrayField);    

    return useMemo(() => {
        return (
            <>
                
                   
                        {/* <EnhancedModalTrigger>
                            <div className={styles.TriggerTitle} style={{color: triggerColor, fontWeight: triggerWeight}}>
                                <MemoizedRichText text={triggerText} />
                            </div>
                            <ModalRef fullScreen="true">
                                <ModalHeader iconCloseSize="36" />
                                <Image src={`https://${runtime?.account}.vteximg.com.br/arquivos/${tableName}.jpg`} />
                            </ModalRef>
                        </EnhancedModalTrigger>   */}
                    
                
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
            default: INITIALVALUES.TRIGGER_TITLE
        },
        triggerColor: {
            title: "Color del texto",
            description: "# Exadecimal",
            type: "string",
            widget: {
                "ui:widget": "color"
            },        
            default: INITIALVALUES.TRIGGER_COLOR
        },
        triggerWeight: {
            title: "Ingresar algún valor de las descripción",
            description: "300, 400, 500, 600, 700",
            type: "string",
            enum: ["400", "700"],
            enumNames: ["normal", "negrita"],
            default: INITIALVALUES.TRIGGER_WEIGHT
        },
        arrayField: {
            title: "Tablas",
            type: "array", 
            items: {
                title: "Tablas",
                type: "object",
                properties: {
                    nombreTabla: {
                        title: "Nombre de la tabla",
                        description: "Poné el nombre",
                        type: "string"
                    },
                    imagenTabla: {
                        title: "Url imagen",
                        description: "Poné la imagen",
                        type: "string",
                        widget: {
                            "ui:widget" : "image-uploader"
                        }                
                    }
                }
            }
        }
    }
}

ProductSize.defaultProps = {
    triggerText: INITIALVALUES.TRIGGER_TITLE,
    triggerColor: INITIALVALUES.TRIGGER_COLOR,
    triggerWeight: INITIALVALUES.TRIGGER_WEIGHT
}

export default ProductSize;