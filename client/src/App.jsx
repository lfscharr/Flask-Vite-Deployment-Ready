import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import router from './assets/Components/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={router}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

