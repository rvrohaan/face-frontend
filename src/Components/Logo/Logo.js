import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-2' style={{ height: '100px', width: '100px', backgroundColor: '#04C8DE' }} tiltMaxAngleX={50} tiltMaxAngleY={50}>
                <img src={brain} alt='logo'></img>
            </Tilt>
        </div>
    );
}

export default Logo;