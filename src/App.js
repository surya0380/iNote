import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/about" element={<About />}></Route>
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
