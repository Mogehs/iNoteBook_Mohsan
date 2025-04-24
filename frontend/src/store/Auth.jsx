import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
const apiUrl = import.meta.env.VITE_User_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]=useState("")

  const storetokenInput = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLogedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  useEffect(()=>{
    getUser()
  },[])
  const getUser=async()=>{
    try {
      const responce= await fetch(apiUrl,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(responce.ok){
        const data= await responce.json()
        setUser(data.message)
      }
    } catch (error) {
      console.log("get user error",error)
      
    }
  }

  return (
    <AuthContext.Provider value={{ storetokenInput, LogoutUser, isLogedIn,getUser,user,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
