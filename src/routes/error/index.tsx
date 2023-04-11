import React from 'react';
import { CommonBtn, SizedBox } from 'src/components';
import styles from './error.module.css';

const ErrorPage = () => {
    const moveToMain = () => {
        window.location.href = '/';
    };

    return (
        <div className={styles.div_error}>
            <p>현재 페이지 : {window.location.href}</p>
            <SizedBox height={10} />
            <p>해당 페이지를 찾지 못했습니다</p>
            <SizedBox height={10} />
            <CommonBtn
                backgroundColor='white'
                color='black'
                width='250px'
                border='1px solid var(--shadow-color)'
                onClick={moveToMain}>
                메인 화면으로 이동
            </CommonBtn>
        </div>
    );
};

export default ErrorPage;