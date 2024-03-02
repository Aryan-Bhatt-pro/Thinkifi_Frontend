import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Graph from "./pages/Home";
import UserAnalysis from "./pages/UserAnalysis"
import NavbarComponent from './components/OtherComps/NavBarComponent';
function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
      <Routes>
        <Route path="/tweet" element={<Graph />} />
        <Route path="/user" element={<UserAnalysis />} >
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
