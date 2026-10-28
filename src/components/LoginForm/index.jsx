import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../Logo";

const LOGIN_API_URL = "https://dummyjson.com/auth/login";

// Simple inline illustration (two phones, shoppers, leaves)
const Illustration = () => (
  <svg viewBox="0 0 440 340" className="login-img" role="img" aria-label="shopping">
    <ellipse cx="60" cy="250" rx="34" ry="52" fill="#2f7d5b" />
    <ellipse cx="385" cy="215" rx="30" ry="46" fill="#f07a3c" />
    <ellipse cx="350" cy="130" rx="22" ry="48" fill="#2f7d5b" />
    <rect x="70" y="40" width="150" height="250" rx="22" fill="#fff" stroke="#2b1f6b" strokeWidth="8" />
    <path d="M70 80 h150 v-14 a20 20 0 0 0 -20 -20 h-110 a20 20 0 0 0 -20 20z" fill="#f0518a" />
    <rect x="90" y="100" width="60" height="10" fill="#f3d57a" />
    <rect x="90" y="120" width="90" height="10" fill="#f3d57a" />
    <rect x="90" y="140" width="70" height="10" fill="#f3d57a" />
    <rect x="260" y="60" width="130" height="220" rx="22" fill="#fff" stroke="#2b1f6b" strokeWidth="8" />
    <circle cx="372" cy="82" r="16" fill="#f0518a" />
    <rect x="280" y="105" width="40" height="40" rx="6" fill="#f6e7b0" />
    <rect x="330" y="105" width="40" height="40" rx="6" fill="#f6e7b0" />
    <rect x="280" y="155" width="40" height="40" rx="6" fill="#f6e7b0" />
    <rect x="330" y="155" width="40" height="40" rx="6" fill="#f6e7b0" />
    <rect x="280" y="215" width="90" height="10" fill="#9ccbe8" />
    <rect x="280" y="235" width="90" height="10" fill="#9ccbe8" />
    <circle cx="170" cy="150" r="14" fill="#5a3a2a" />
    <rect x="156" y="166" width="28" height="70" rx="10" fill="#f0518a" />
    <rect x="160" y="236" width="8" height="50" fill="#3a2a6b" />
    <rect x="174" y="236" width="8" height="50" fill="#3a2a6b" />
    <circle cx="215" cy="170" r="13" fill="#7a4a2a" />
    <rect x="203" y="185" width="26" height="60" rx="10" fill="#3aa0d8" />
    <rect x="207" y="245" width="7" height="42" fill="#3a2a6b" />
    <rect x="219" y="245" width="7" height="42" fill="#3a2a6b" />
    <rect x="120" y="200" width="30" height="40" rx="4" fill="#f4a73c" />
    <rect x="226" y="215" width="30" height="40" rx="4" fill="#d96aa8" />
    <path d="M90 300 Q220 330 330 270" stroke="#bcdcf2" strokeWidth="14" fill="none" strokeLinecap="round" />
  </svg>
);

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => setUsername(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input-field"
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  );

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
    </>
  );

  // Step 2: on login success, go to Home and replace the history entry
  const onSubmitSuccess = () => {
    navigate("/", { replace: true });
  };

  // Step 1: make the authentication request to the login API
  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(LOGIN_API_URL, options);
    const data = await response.json();
    console.log(data); // contains the JWT token (accessToken) on success

    if (response.ok === true) {
      onSubmitSuccess();
    }
    // On login failure -> handled in Part 2
    // Store the JWT token -> handled in Part 2
  };

  return (
    <div className="login-page">
      <Illustration />
      <form className="login-card" onSubmit={submitForm}>
        <div className="login-logo">
          <Logo />
        </div>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
