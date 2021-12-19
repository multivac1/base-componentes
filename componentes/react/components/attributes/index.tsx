import React, { useMemo, useContext, Fragment } from 'react';
import { ProductContext } from 'vtex.product-context';
import Attributes from './Attributes';
import styles from './styles.css';

interface PropsI {
    isShow: boolean,
    attributeTitle: string,
    titleSize: string,
    subtitleSize: string
}
interface OptionsI {
    IS_SHOW: boolean,
    ATTRIBUTE_TITLE: string,
    TITLE_SIZE: string,
    SUBTITLE_SIZE: string
}
const OPTIONS:OptionsI = {
    IS_SHOW: true,
    ATTRIBUTE_TITLE: 'Attribute title',
    TITLE_SIZE: '18px',
    SUBTITLE_SIZE: '16px'
}

const ProductAttributes = (props: PropsI) => {
    const {product} = useContext(ProductContext);
    const properties = product.properties;
    const {isShow, attributeTitle, titleSize, subtitleSize} = props;
    
    return useMemo(() => {
        return (
            <>
                {
                    isShow ?
                        <div className={styles.ContainerProductAttributes}> 
                            <h1 className={styles.TitleProductAttributes} style={{fontSize: titleSize}}>{attributeTitle}</h1>
                            <Attributes 
                                properties={properties}
                                subtitleSize={subtitleSize}
                            />
                        </div>
                    : <Fragment />
                }
            </>
        )
    },[]);
}

ProductAttributes.schema = {
    title: 'Product attributes',
    type: 'object',
    properties: {
        isShow: {
            title: 'Hide component?',
            type: 'boolean',
            default: OPTIONS.IS_SHOW
        },
        attributeTitle: {
            title: 'Container Title',
            type: 'boolean',
            default: OPTIONS.ATTRIBUTE_TITLE
        },
        titleSize: {
            title: 'Title Size:',
            type: 'string',
            default: OPTIONS.TITLE_SIZE
        },
        subtitleSize: 'Subtitle Size',
        type: 'string',
        default: OPTIONS.SUBTITLE_SIZE
    }
}

ProductAttributes.defaultProps = {
    isShow: OPTIONS.IS_SHOW,
    attributeTitle: OPTIONS.ATTRIBUTE_TITLE,
    titleSize: OPTIONS.TITLE_SIZE,
    subtitleSize: OPTIONS.SUBTITLE_SIZE
}

export default ProductAttributes;