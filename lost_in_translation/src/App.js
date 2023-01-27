import './App.css';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Translator from './components/Translator';
import Profile from './components/Profile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {



  return (
    <BrowserRouter>
      <div className="App col-6 offset-3">
        <Header/>
        <Routes>
          <Route path='/' element={ <Login />} />
          <Route path='/translator' element={ <Translator />} />
          <Route path='/profile' element={ <Profile />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>

  );
}

export default App;
