// App.jsx or where your routes are defined
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Category from './Category';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/category/:categoryCode" element={<Category/>} />
            </Routes>
        </Router>
    );
}

export default App;
