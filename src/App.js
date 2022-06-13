import { HashRouter, Route, Routes } from "react-router-dom";
//import { Container } from "react-bootstrap";
import { LoadingScreen,ProtectedRoutes } from "./Components";
import { useSelector } from "react-redux";
import { Home, Login, ProductDetails, Purchases, UserInfo, SignUp  } from "./Components/Pages";
import './App.css';


function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/user" element={<UserInfo />} />
          </Route>
        </Routes>
      
    </HashRouter>
  );
}

export default App;
