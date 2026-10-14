// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const storedUser = localStorage.getItem("user");

//   if (storedUser) {
//     const storedData = JSON.parse(storedUser);
//     setUser(storedData.user);
//   }
// }, []);

//   const login = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//     navigate("/");
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const storedData = JSON.parse(storedUser);
        setUser(storedData.user ?? storedData);
      }
    } catch (error) {
      console.error("Failed to restore user session:", error);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    const loggedInUser = userData?.user ?? userData;
    console.log("Full login/signup response:", userData);
    console.log("User object:", loggedInUser);

    if (!loggedInUser || typeof loggedInUser !== "object") {
      console.error("Invalid login response:", userData);
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(loggedInUser);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
