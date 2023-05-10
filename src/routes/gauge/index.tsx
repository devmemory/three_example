import React, { useEffect } from 'react';
import util from 'src/util/common_util';
import { useGauge } from 'src/custom_hooks';
import { CommonBtn } from 'src/components';

const Gauge = () => {
    const { ref, setValue, resetCamera } = useGauge();

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(util.generateNumber());
            console.log('/');
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

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

export default Gauge;