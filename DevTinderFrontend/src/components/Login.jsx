import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("vicky@gmail.com");
  const [password, setPassword] = useState("Vicky@123");
  const [error, setError] = useState();

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
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

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
        <button className="btn btn-neutral mt-4" onClick={handleLoginClick}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
