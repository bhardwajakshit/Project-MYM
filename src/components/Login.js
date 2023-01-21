import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { handleKeypress } from "../utils/EnterKey"
import "../App.css" 

export default function Login() {
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const navigate = useNavigate();
  const location = useLocation();

  // Redirects a user after authentication
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
 
  // This function will be called whenever the user edits the form.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
 
  // Function to redirect a user to home page if logged in.
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
        if (fetchedUser) {
        // Redirecting once fetched.
        redirectNow();
      }
    }
  }
  
  useEffect(() => {
    loadUser();
  }, []);
 
  // Login Button Function
  const onSubmit = async (event) => {
    try {
      // Passing user details to emailPasswordLogin function to validate the credentials and log in the user.
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
        if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
        } else {
          alert(error);
        }
      }
    };
 

  return (
    <div className="auth_flex">
      <form className="form">
        <h1>Welcome back</h1>
        <h5>Please enter your details.</h5>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          name="password"
          value={form.password}
          onChange={onFormInputChange}
          onKeyDown={(e) => handleKeypress(e, onSubmit)}
          style={{ marginBottom: "1rem" }}
        />
        <div className="checkbox-container">
          <label>
          Show password?
          <input 
            type = "checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          </label>
        </div>
        <br/>
        <Button disableRipple class="auth_button" variant="contained" onClick={onSubmit}> Login </Button>
        <p> Don't have an account? <Link className="link" to="/signup"> Signup </Link></p>
      </form>
    </div>
)};