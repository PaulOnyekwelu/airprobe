import React from 'react';
import { SpinnerGif } from '../../images';

const Spinner = () => {
    return (
        <img src={SpinnerGif} style={{width: "100%"}} alt="loading..." />
    )
}

export default Spinner;