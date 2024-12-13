import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();  // ye custom hook ka part hai jis ki help se socket connaction or online user ke data store kiya gaya hai

// it is a hook.
export const useSocketContext = () => {// custom hook yaha se create ho raha hai
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null); // ye user _id store kare ga 
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5002", {// socket me user_id store ho gaya hai
        query: {
          userId: authUser.user._id, // yaha se user ka id ke throw socket connect ho raha hai backend me 
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => { // taha user _id pass ho raha hai
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
