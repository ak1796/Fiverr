import React, { useEffect, useRef, useState } from "react";
import { useMessageContext } from "../../context/MessageContext";
import { useAppContext } from "../../context/AppContext";
import { FcGallery } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { assest } from "../../assets/assests";

const ChatContainer = () => {
  const {
    selectedUser,
    setSelectedUser,
    sendMessages,
    getUserMessage,
    messages,
  } = useMessageContext();

  const { user } = useAppContext();

  const scrollEnd = useRef(null);
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessages({ text: input.trim() });
    setInput("");
    if (selectedUser) {
      getUserMessage(selectedUser._id);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
    }

    const formData = new FormData();
    formData.append("image", file);

    await sendMessages(formData);
    setInput("");
    if (selectedUser) {
      getUserMessage(selectedUser._id);
    }
  };

  const formatMessageTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  useEffect(() => {
    if (selectedUser) {
      getUserMessage(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages?.length) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.avatar || assest.avatar}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <p className="flex-1 text-lg text-black flex items-center gap-2">
          {selectedUser.name}
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </p>
        <FaArrowLeft
          onClick={() => setSelectedUser(null)}
          className="md:hidden w-7 cursor-pointer"
        />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.sender !== user._id && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8 "
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white  ${
                  msg.sender === user._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div>
              <img
                src={
                  msg.sender === user._id
                    ? user?.avatar || assest.avatar
                    : selectedUser?.avatar || assest.avatar
                }
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd} />
      </div>

      {/* Message Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3">
        <div className="flex flex-1 bg-[#DBEAFE] mx-10 p-3 rounded-full justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            placeholder="Send a message"
            className="flex-grow text-lg border-none outline-none bg-transparent placeholder-gray-400"
            type="text"
          />
          <input
            onChange={handleImageSubmit}
            type="file"
            accept="image/png, image/jpeg"
            hidden
            id="image"
            name="image"
          />
          <label htmlFor="image">
            <FcGallery className="text-4xl cursor-pointer" />
          </label>
        </div>
        <IoSend
          onClick={handleSendMessage}
          className="text-3xl cursor-pointer mr-5 text-blue-500"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assest.logo} className="w-20" alt="App logo" />
      <p className="text-lg font-medium text-black">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
