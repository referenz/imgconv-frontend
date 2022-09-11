import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavigation from './components/TopNavigation';
import AppMain from './components/AppMain';
import AppAbout from './components/AppAbout';

function App() {
  return (
    <>
      <TopNavigation />
      <Routes>
        <Route path='/' element={<AppMain />} />
        <Route path='about' element={<AppAbout />} />
      </Routes>
    </>
  );
}

export default App;
