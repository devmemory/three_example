import React from 'react';
import { useGLTF } from 'src/hooks';

const GLTFExample = () => {
    const { ref } = useGLTF();

    return (
        <div ref={ref} className='div_three' />
    );
};

export default GLTFExample;