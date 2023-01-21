import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

const PrivateRoute = () => {
    
 // Fetching the user from the user context
 const { user } = useContext(UserContext);
 const location = useLocation();
 const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;
 
 // If user is not logged in - redirect to login page else continue to the page 
 return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet /> ;
}
 
export default PrivateRoute;