import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateArea from './pages/Home';
import Header from './components/Header';
import Note from './pages/Note'

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Header/>
        <div className='pages'>
        <Routes>
          <Route
            path="/"
            element={<CreateArea/>} 
          /> 
        </Routes>
        <Routes>
          <Route
            path="/"
            element={<Note/>} 
          />
        </Routes>
        </div>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
