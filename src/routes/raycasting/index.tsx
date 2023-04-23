import React from 'react';
import useRaycasting from 'src/custom_hooks/use_raycasting';

const Raycasting = () => {
    const { ref } = useRaycasting();

    return (
        <div ref={ref} className='div_three' />
    );
};

export default Raycasting;