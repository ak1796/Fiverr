import { useContext, createContext, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessage, setUnseenMessages] = useState({});
  const [messages, setMessages] = useState([]);

  const [usersForFreelancersSlidebar, setUsersForFreelancersSlidebar] =
    useState([]);

  const [freelancerForUserSlidebar, setFreelancerForUserSlidebar] = useState(
    []
  );

  const getUsersForFreelancer = async () => {
    try {
      const { data } = await axios.get("/api/message/get-all-user");

      if (data.success) {
        setUsersForFreelancersSlidebar(data.data.users);
        setUnseenMessages(data.data.unseen);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFreelancerForClient = async () => {
    try {
      const { data } = await axios.get("/api/message/get-freelaner");

      if (data.success) {
        setFreelancerForUserSlidebar(data.data.uniqueFreelancers);
        setUnseenMessages(data.data.unseenMessages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendMessages = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/message/send/${selectedUser?._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserMessage = async (userId) => {
    try {
      const { data } = await axios.get(`/api/message/get-message/${userId}`);

      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const subscribeToUser = () => {
    if (!socket) return;

    socket.on("newMessage", async (message) => {
      if (selectedUser?._id === message.sender) {
        message.seen = true;
        setMessages((prev) => [...prev, message]);

        try {
          await axios.put(`/api/message/mark/${message._id}`);
        } catch (error) {
          console.error("Failed to mark message as seen:", error.message);
        }
      } else {
        setUnseenMessages((prevMessage) => ({
          ...prevMessage,
          [message.sender]: (prevMessage?.[message.sender] || 0) + 1,
        }));
      }
    });
  };
  const unsubscribeToUser = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToUser();

    return () => unsubscribeToUser();
  }, [selectedUser, socket]);

  const connectSocket = async (userDatas) => {
    const newSocket = io(backendUrl, {
      query: {
        userId: userDatas._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);
  };

  const value = {
    axios,
    connectSocket,
    selectedUser,
    setSelectedUser,
    unseenMessage,
    setUnseenMessages,
    usersForFreelancersSlidebar,
    getUsersForFreelancer,
    getFreelancerForClient,
    getUserMessage,
    freelancerForUserSlidebar,
    sendMessages,
    messages,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export function useMessageContext() {
  return useContext(MessageContext);
}
