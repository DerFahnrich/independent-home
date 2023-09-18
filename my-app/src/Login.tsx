import { useState } from "react";
import "./Login.css"

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    
    <div className="login">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
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
