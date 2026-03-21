import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUpClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your Firstname..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your Lastname..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 mt-1">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLoginClick : handleSignUpClick}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          className="cursor-pointer text-sm hover:text-blue-500 py-2"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New user? Sign up here"
            : "Already have an account? Login here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
