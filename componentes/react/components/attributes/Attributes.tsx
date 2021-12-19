import React, { Fragment, useMemo } from 'react';
import styles from './styles.css';

interface PropertiesI {
    properties: Property[],
    subtitleSize: string
}
interface Property {
    name: string,
    values: string,
}

const Attributes = (props:PropertiesI) => {
    const {properties, subtitleSize} = props;
    
    return useMemo(() => {
        return (
            <div>
                {
                    properties && properties.length ?
                        properties.map((item:Property) => (
                            <ul className={styles.ContentProductAttributes}>
                                <li className={styles.SubtitleProductAttributes} style={{fontSize:subtitleSize}}>{item.name}</li>
                                <li className={styles.DescriptionProductAttributes}>{item.values}</li>
                            </ul>
                        )) 
                    : <Fragment />
                }
            </div>
        )
    },[properties])
}

export default Attributes
