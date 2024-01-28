import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import AddPostcode from "./pages/AddPostcode/AddPostcode";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import UserLoginContextProvider from "./context/UserLoginContextProvider/UserLoginContextProvider";

function App() {
  return (
    <BrowserRouter>
      <UserLoginContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add_postcode" element={<AddPostcode />} />
        </Routes>
      </UserLoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
