import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import "./App.css"

function App() {
 return (
   <BrowserRouter>
     <UserProvider>
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />

         {/* Protecting Home Page from unauthenticated users by wrapping it with PrivateRoute */}
         <Route element={<PrivateRoute />}>
         <Route path="/" element={<Home />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;