import { useState } from "react";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="login">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="passwor"
      />
    </div>
  );
};
