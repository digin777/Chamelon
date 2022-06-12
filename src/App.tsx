import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Section from './components/admin/Section';
import SectionAdd from './components/admin/SectionAdd';
import SectionEdit from './components/admin/SectionEdit'
import ErrorPage from './components/admin/ErrorPage';
import SectionView from './components/admin/SectionView';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} >
            <Route path=":section" element={<Section />} />
              <Route path=":section/add" element={<SectionAdd />}/>
              <Route path=":section/:id/edit" element={<SectionEdit />}/>
              <Route path=":section/:id/view" element={<SectionView />}/>
            {/* </Route> */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
