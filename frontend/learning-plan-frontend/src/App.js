
// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePlanPage from './components/CreatePlanPage';
import ViewPlansPage from './components/ViewPlansPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewPlansPage />} />
        <Route path="/create" element={<CreatePlanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
