import React, { lazy } from "react";

const MainIndex = lazy(() => import('src/routes/index'));
const BasicExample = lazy(() => import('src/routes/basic/index'));
const Gauge = lazy(() => import('src/routes/gauge/index'));
const Error = lazy(() => import('src/routes/error/index'));

export const routeName = {
    main: '/',
    basic: '/basic',
    gauge: '/gauge'
};

export const routeArr = [
    { path: routeName.main, element: <MainIndex /> },
    { path: routeName.gauge, element: <Gauge /> },
    { path: routeName.basic, element: <BasicExample /> },
    { path: '*', element: <Error /> }
];