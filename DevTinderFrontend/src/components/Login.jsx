import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("yuzi@gmail.com");
  const [password, setPassword] = useState("Yuzi@123");

  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
    } catch (err) {
      console.log("ERROR:", err.response?.data);
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

        <button className="btn btn-neutral mt-4" onClick={handleLoginClick}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
