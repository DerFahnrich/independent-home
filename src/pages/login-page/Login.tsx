import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setIsLoggedIn } from "../../store/authSlice";
import "./Login.css";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const url = "/api/internal/admin/login";

  const login = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept-Language": "",
        "X-TVXClientType": "admin",
        Authorization:
          "Basic " + btoa(username + ":" + encodeURIComponent(password)),
      },
    });

    const data: boolean = await response.json();

    dispatch(setIsLoggedIn(data));
    navigate("/dashboard", { replace: true });
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("submitting");
    login();
  };

  return (
    <div className="login-page">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleOnSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button">Log In</button>
      </form>
    </div>
  );
};
