import React from 'react';
import './loader.css'

function Loader(props) {

    const { width, borderWidth } = props

    return (
        
            <div style={{height: width, width: width, borderWidth: borderWidth}} className="loader"></div>
    );
}

export default Loader;
