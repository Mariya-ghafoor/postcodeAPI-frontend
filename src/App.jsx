import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import AddPostcode from "./pages/AddPostcode/AddPostcode";
import JwtContextProvider from "./context/JwtContextProvider/JwtContextProvider";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <JwtContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add_postcode" element={<AddPostcode />} />
        </Routes>
      </JwtContextProvider>
    </BrowserRouter>
  );
}

export default App;
