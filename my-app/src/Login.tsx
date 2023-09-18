import { useState } from "react";

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
      <form onSubmit={handleOnSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
