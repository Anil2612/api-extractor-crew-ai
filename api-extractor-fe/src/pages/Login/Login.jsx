import { useState } from "react";
import "./Login.scss";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (req) => login(req),
    onSuccess: (data, param) => {
      localStorage.setItem("currentUser", param?.username);
      localStorage.setItem("ack-tk", data?.idToken);
      navigate("/dashboard");
    },
    onError: () => {
      window.alert("❌ Error logging in");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      mutation.mutate({ username, password });
    } else {
      window.alert("Please enter username and password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome To API Extractor</h2>
        <p>Please login to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
