import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';


function App() {

  return (
    <BrowserRouter>
      <div className="App bg-slate-900 h-screen text-gray-300 flex  justify-center items-center">
        <AppRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default App;
