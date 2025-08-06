import React from "react";
import { useMessageContext } from "../../context/MessageContext";
import ChatContainer from "./ChatContainer";
import ChatSlidebar from "./ChatSlidebar";

const ChatOutlet = () => {
  const { selectedUser, setSelectedUser } = useMessageContext();

  return (
    <div className="w-screen h-screen px-6 py-8 bg-[#F7F8FA]">
      <div
        className={`grid overflow-hidden rounded-2xl h-full backdrop-blur-xl text-black border-2 border-gray-300 shadow-md ${
          selectedUser
            ? "md:grid-cols-[1fr_3fr_] "
            : "md:grid-cols-2"
        } grid grid-cols-1`}
      >
        <ChatSlidebar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatOutlet;
