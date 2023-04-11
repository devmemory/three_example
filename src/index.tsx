import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { routeArr } from './util/route_util';

const App = () => {
  return (
    <BrowserRouter>
      <main className='main_app'>
        <Suspense fallback={<div />}>
          <Routes>
            {routeArr.map((e, i) => (<Route
              key={`route_${i}`}
              path={e.path} element={e.element} />))}
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(<App />);
