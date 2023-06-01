import React from 'react';
import { CommonBtn } from 'src/components';
import { useEarth } from 'src/hooks';

const Earth = () => {
    const { ref, resetCamera } = useEarth();

    return (
        <>
            <div className='div_three' ref={ref} />

            <CommonBtn
                position='absolute'
                right='30px'
                bottom='30px'
                onClick={resetCamera}>Reset camera</CommonBtn>
        </>
    );
};

export default Earth;