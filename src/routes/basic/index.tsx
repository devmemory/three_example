import React from 'react';
import { useBasic } from 'src/custom_hooks';

const BasicExample = () => {
    const { ref } = useBasic();

    return (
        <div ref={ref} className='div_three' />
    );
};

export default BasicExample;