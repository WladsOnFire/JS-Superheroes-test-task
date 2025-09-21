import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HeroesList from "./pages/HeroesList";
import Hero from "./pages/Hero";
import AddHero from "./pages/AddHero";
import "./style.css";
import UpdateHero from "./pages/UpdateHero";

function App() {
  return (


    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroesList/>}/>
          <Route path="/hero/:id" element={<Hero/>}/>
          <Route path="/add" element={<AddHero/>}/>
          <Route path="/edit/hero/:id" element={<UpdateHero/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
