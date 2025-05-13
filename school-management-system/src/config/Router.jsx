import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home";
import Login from "../components/loginregister/login";
import { useEffect, useState } from "react";
import Register from "../components/loginregister/register";
import { auth, onAuthStateChanged } from "./firebase";
import Demo from "../components/loginregister/demo";
import HashLoader from "react-spinners/HashLoader";
import FrontPage from "../components/FrontPage/index";
import ResultSheet from "../components/Results/Results";

function Approuter() {
  const [user, setUser] = useState(false);
  const [loader, setLoader] = useState(true);

  // Handle user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(!!firebaseUser);
      setTimeout(() => setLoader(false), 1000); // Optional delay
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Only log once when user changes
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  // Loader spinner color
  const colors = [
    "red", "green", "blue", "yellow", "orange", "purple", "pink", "black",
    "brown", "cyan", "gray", "lime", "magenta", "navy", "olive", "silver", "teal",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      {loader ? (
        <HashLoader
          color={randomColor}
          cssOverride={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            zIndex: "1000",
            margin: "0 auto",
          }}
          loading
          size={50}
          speedMultiplier={3}
        />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/Demo" /> : <FrontPage />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/Demo" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/Demo" /> : <Register />}
            />
            <Route
              path="/Demo"
              element={user ? <Demo /> : <Navigate to="/" />}
            />
            <Route path="/ResultSheet" element={<ResultSheet />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default Approuter;
