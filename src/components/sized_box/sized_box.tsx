import React from 'react';
import styles from './sized_box.module.css';

type BoxProps = {
    height?: number,
    width?: number,
};

const SizedBox: React.FC<BoxProps> = ({ height, width }) => {
    return (
        <div className={styles.div_sized_box} style={{ '--height': `${height}px`, '--width': `${width}px` } as React.CSSProperties} />
    );
};

export default SizedBox;