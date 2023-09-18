import { useState } from "react";
import "./Login.css";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

    const data = await response.json;
    console.log(data);
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("submitting");
    login();
  };

  return (
    <div className="login">
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

        <button>Log In</button>
      </form>
    </div>
  );
};
