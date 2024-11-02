import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployee from './components/ListEmployee';
import AddEmployee from './components/AddEmployee';
import FetchActiveEmployee from './components/FetchActiveEmployee';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListEmployee />} />
            <Route path='/employees' element={<ListEmployee />} />
            <Route path='/add-employee' element={<AddEmployee />} />
            <Route path='/edit-employee/:id' element={<AddEmployee />} />
            <Route path='/fetch-active-Emplyee' element={<FetchActiveEmployee />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
