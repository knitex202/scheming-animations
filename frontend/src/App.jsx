import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Nav from "./components/Nav";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import LoginSignup from "./Pages/LoginSignup";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";


function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/animations" element={<ShopCategory category="animations"/>}/>
        <Route path="/presets" element={<ShopCategory category="presets"/>}/>
        <Route path="/overlays" element={<ShopCategory category="overlays"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<LoginSignup/>}/>
        <Route path="/signup" element={<Signup/> } />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
