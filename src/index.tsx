import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './util/route_util';

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <RouterProvider router={router} />
    </Suspense >
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(<App />);
