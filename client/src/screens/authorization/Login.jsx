import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Login({ darkMode, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      
      const userEmail = result.user.email;
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("loggedInUserEmail", userEmail);
      localStorage.setItem("zainab_anie_logged_in", "true");

      if (setIsLoggedIn) setIsLoggedIn(true);

      // Trigger custom event so Header updates instantly without refresh
      window.dispatchEvent(new Event("authChange"));

      // Smoothly navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError("Google sign-in failed. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const userEmail = userCredential.user.email;
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("loggedInUserEmail", userEmail);
      localStorage.setItem("zainab_anie_logged_in", "true");

      if (setIsLoggedIn) setIsLoggedIn(true);

      // Trigger custom event so Header updates instantly without refresh
      window.dispatchEvent(new Event("authChange"));

      // Smoothly navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError("Invalid email or password. Please check your credentials.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Access temporarily blocked due to many failed attempts. Try again later.");
      } else {
        setError("An error occurred during sign in. Please try again.");
      }
    }
  };

  return (
    <div style={{ 
      maxWidth: "420px", 
      margin: "60px auto", 
      padding: "40px", 
      border: darkMode ? "1px solid #333" : "1px solid #eaeaea", 
      fontFamily: "sans-serif", 
      background: darkMode ? "#121212" : "#fff", 
      color: darkMode ? "#fff" : "#000",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)" 
    }}>
      
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "1px", margin: "0 0 8px 0", color: darkMode ? "#fff" : "#111" }}>ZAINAB ANIE</h2>
        <p style={{ fontSize: "11px", color: darkMode ? "#aaa" : "#666", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0" }}>Sign In to Your Account</p>
      </div>

      {error && <p style={{ color: "#d9534f", fontSize: "12px", textAlign: "center", marginBottom: "15px", fontWeight: "500" }}>{error}</p>}

      <button 
        type="button"
        onClick={handleGoogleAuth}
        style={{ 
          width: "100%", 
          padding: "14px", 
          marginBottom: "20px", 
          background: darkMode ? "#000" : "#fff", 
          color: darkMode ? "#fff" : "#000",
          border: darkMode ? "1px solid #555" : "1px solid #111", 
          cursor: "pointer", 
          fontSize: "12px", 
          letterSpacing: "1px", 
          fontWeight: "600", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}
      >
        CONTINUE WITH GOOGLE
      </button>

      <div style={{ textAlign: "center", margin: "20px 0", color: darkMode ? "#888" : "#888", fontSize: "11px", letterSpacing: "1.5px" }}>OR WITH EMAIL</div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "11px", letterSpacing: "1px", color: darkMode ? "#ccc" : "#333", fontWeight: "500" }}>EMAIL ADDRESS</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
            style={{ 
              width: "100%", 
              padding: "12px", 
              boxSizing: "border-box", 
              background: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "#fff" : "#000",
              border: darkMode ? "1px solid #444" : "1px solid #ccc", 
              fontSize: "13px", 
              outline: "none" 
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "11px", letterSpacing: "1px", color: darkMode ? "#ccc" : "#333", fontWeight: "500" }}>PASSWORD</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
            style={{ 
              width: "100%", 
              padding: "12px", 
              boxSizing: "border-box", 
              background: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "#fff" : "#000",
              border: darkMode ? "1px solid #444" : "1px solid #ccc", 
              fontSize: "13px", 
              outline: "none" 
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{ width: "100%", padding: "14px", background: darkMode ? "#fff" : "#000", color: darkMode ? "#000" : "#fff", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "2px", fontWeight: "bold" }}
        >
          SIGN IN
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "25px", fontSize: "12px", color: darkMode ? "#aaa" : "#555" }}>
        New to Zainab Anie? <Link to="/signup" style={{ color: darkMode ? "#fff" : "#000", fontWeight: "bold", textDecoration: "underline" }}>Create Account</Link>
      </p>
    </div>
  );
}