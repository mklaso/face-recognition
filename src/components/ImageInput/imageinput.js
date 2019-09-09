import React from 'react';
import './imageinput.css';

const ImageInput = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='center' id='p1'>
                {'Give the face detection a try!'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type="text" placeholder='enter an image url' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageInput;