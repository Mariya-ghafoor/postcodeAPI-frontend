import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import AddPostcode from "./pages/AddPostcode/AddPostcode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add_postcode" element={<AddPostcode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
