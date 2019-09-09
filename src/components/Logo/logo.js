import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import eye from './retina.svg';

const Logo = () => {
    return (
        <div className='ma4 mt0' style={{ display: 'flex', justifyContent: 'center' }}>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 35 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={eye} alt="logo" />
                </div>
            </Tilt>

        </div>
    )
}

export default Logo;