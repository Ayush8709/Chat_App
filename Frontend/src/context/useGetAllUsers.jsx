import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {

        //This token is stored in the browser's cookies as jwt, but it is not accessible to JavaScript due to the httpOnly (ye backend me res.cookise me hai ) flag.
        const token = Cookies.get("jwt");// due to security reasion ham is token ko nii dekh sakte kyu ki ye broswer walle javascript pe ni chalta hai
        
        const response = await axios.get("/api/user/allusers", { // all user ko ge kar raha hai jo bhi database me hai
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setAllUsers(response.data);
        setLoading(false);
        
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);

  // console.log('all user', allUsers)

 
  return [allUsers, loading];
}

export default useGetAllUsers;
