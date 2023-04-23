import React, { lazy } from "react";

const MainIndex = lazy(() => import('src/routes/index'));
const BasicExample = lazy(() => import('src/routes/basic/index'));
const Raycasting = lazy(() => import("src/routes/raycasting"));
const Gauge = lazy(() => import('src/routes/gauge/index'));
const Earth = lazy(() => import("src/routes/earth"));
const Error = lazy(() => import('src/routes/error/index'));

export const routeName = {
    main: '/',
    basic: '/basic',
    racasting: '/raycasting',
    gauge: '/gauge',
    earth: '/earth'
};

export const routeArr = [
    { path: routeName.main, element: <MainIndex /> },
    { path: routeName.gauge, element: <Gauge /> },
    { path: routeName.basic, element: <BasicExample /> },
    { path: routeName.racasting, element: <Raycasting /> },
    { path: routeName.earth, element: <Earth /> },
    { path: '*', element: <Error /> }
];