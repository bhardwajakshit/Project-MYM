import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { handleKeypress } from "../utils/EnterKey";
import "../App.css" 

export default function Signup() {

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

  const { emailPasswordSignup } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
 
  // Signup Button Function
  const onSubmit = async () => {
    try {
      // Passing user details to emailPasswordLogin function to validate the credentials and sign up the user.
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };
 

  return (
    <div className="auth_flex">
    <form className="form">
      <h1>Create an account</h1>
      <h5>Please enter your details</h5>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        name="email"
        value={form.email}
        onInput={onFormInputChange}
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        name="password"
        value={form.password}
        onInput={onFormInputChange}
        onKeyDown={(e) => handleKeypress(e, onSubmit)}
        style={{ marginBottom: "1rem" }}
      />
      <div className="checkbox-container">
        <label>
          Show password?
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
        </label>
      </div>
      <br/>
      <Button disableRipple class="auth_button" onClick={onSubmit}> Signup </Button>
      <p> Have an account already? <Link className="link" to="/login"> Login </Link></p>
    </form>
    </div>
)};