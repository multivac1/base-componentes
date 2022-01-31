import React, { Fragment, useContext, useMemo } from 'react';
import { ProductContext } from 'vtex.product-context';
import EnhancedModalTrigger from 'vtex.modal-layout/ModalTrigger';
import ModalRef from 'vtex.modal-layout/Modal';
import ModalHeader from 'vtex.modal-layout/ModalHeader';
import MemoizedRichText from 'vtex.rich-text/index';
import Image from 'vtex.store-image/Image';
import styles from './styles.css';

interface ITrigger {
    triggerText: string,
    triggerColor: string,
    triggerWeight: number,
    iconCloseSize: number,
    iconCloseColor: string,
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
    TRIGGER_WEIGHT: number,
    ICON_CLOSE_SIZE: number ,
    ICON_CLOSE_COLOR: string
}

const INITIALVALUES: IInitialvalues = {
    TRIGGER_TITLE: "Tabla de Talles",
    TRIGGER_COLOR: "#000",
    TRIGGER_WEIGHT: 400,
    ICON_CLOSE_SIZE: 36,
    ICON_CLOSE_COLOR: "black"
}

const ProductSize = (props: ITrigger) => {
    const { product } = useContext( ProductContext );
    const { triggerText, triggerColor, triggerWeight, iconCloseSize, iconCloseColor, arrayField } = props;
    const properties = product?.properties;
    const filteredAtribute = properties?.filter((property:any) => property?.name == "Tabla de talles").map((item:any) => (item?.values[0]));
    const tableNameAtribute = filteredAtribute?.toString().toLowerCase().replace(/ /g, ""); 
    const tableNames = arrayField.map((item:any) => item.nombreTabla);
    const tableImages = arrayField.map((item:any) => item.imagenTabla); 
    const validateTable = tableNames.find((field:any) => field.toLowerCase().replace(/ /g, "") === tableNameAtribute);
    const indexOfNames = tableNames.indexOf(validateTable);
    const modalImageUrl = tableImages[indexOfNames];

    // producto c/atributo para test prendas superiores: https://productsize--herenciaar.myvtex.com/3837561171hb-remera-hot-ride-307/p
    // producto test boys: https://productsize--herenciaar.myvtex.com/3861161171cr-remera-rat-rod-317/p
    // prod s/atributo: https://productsize--herenciaar.myvtex.com/3866621101az-gorra-herencia-108/p?skuId=41258

    return useMemo(() => {
        return (
            <>
                {
                    validateTable ?
                        <EnhancedModalTrigger>
                            <div className={styles.TriggerTitle} style={{color: triggerColor, fontWeight: triggerWeight}}>
                                <MemoizedRichText text={triggerText} />
                            </div>
                            <ModalRef>
                                <div className={styles.ModalContainer}>
                                    <div className={styles.CloseModalIcon} style={{color: iconCloseColor}}>
                                        <ModalHeader iconCloseSize={iconCloseSize} />
                                    </div>
                                    <Image src={modalImageUrl} width="100%" />
                                </div>
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
        iconCloseSize: {
            title: "Tamaño icono cerrar modal",
            description: "se recomienda números entre 28 y 38",
            type: "number",
            default: INITIALVALUES.ICON_CLOSE_SIZE
        },
        iconCloseColor: {
            title: "Color ícono cerrar modal",
            description: "Seleccionar entre negro o blanco",
            enum: ["black", "white"],
            enumNames: ["negro","blanco"],
            default: INITIALVALUES.ICON_CLOSE_COLOR
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
    triggerWeight: INITIALVALUES.TRIGGER_WEIGHT,
    iconCloseSize: INITIALVALUES.ICON_CLOSE_SIZE,
    iconCloseColor: INITIALVALUES.ICON_CLOSE_COLOR
}

export default ProductSize;