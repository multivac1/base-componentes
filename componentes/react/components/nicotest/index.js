import React, { useMemo, Fragment } from 'react';
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext';
import styles from './styles.css'

const NicoTest = (props) => {
    const { searchQuery } = useSearchPage();
    
    return useMemo(() =>{
        return (
            <div className={styles.ComponentContainer}>
                <h2 className={styles.ComponentTitle}>Estos son los resultados para: "{searchQuery?.variables?.fullText}"</h2>
                <p className={styles.ComponentSubtitle}>En total encontramos: {searchQuery?.products?.length} productos</p>
            </div>
        )
    },[])
}

NicoTest.schema = {
    title: "Search data component",
    description: "Render products quantity and value from search",
    type: "object",
    properties: {
        visibility: {
            title: "Is visible?",
            description: "Enable or disable the component",
            type: "boolean",
        },
        text: {
            title: "Render text",
            description: "Input text",
            type: "string",
        }
    }
}

NicoTest.defaultProps = {
    visibility: true,
    text: ""
}

export default NicoTest