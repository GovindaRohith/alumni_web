import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Page from './components/Page.js';

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Page/>}/>
    </Routes>
  </Router>
);
}

export default App;