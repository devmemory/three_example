import React from 'react';
import { useRaycasting } from 'src/hooks';

const Raycasting = () => {
    const { ref } = useRaycasting();

    return (
        <div ref={ref} className='div_three' />
    );
};

export default Raycasting;