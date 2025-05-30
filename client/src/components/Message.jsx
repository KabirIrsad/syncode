import { Box } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import Avatar from "react-avatar";

// eslint-disable-next-line react/prop-types
const Message = ({ message, sender, timestamp }) => {
  const { authUser } = useAuthContext();
  const formattedSender = sender === authUser.username ? "You" : sender;

  return (
    <Box
      className={`bg-slate-700 text-left min-w-[20%] max-w-[80%] p-2 rounded-lg ${
        formattedSender === "You" ? "self-end" : "self-start"
      } mx-1.5`}
    >
      {/* Header (Avatar + Name + Timestamp) */}
      <Box className="flex justify-between items-center pb-2 border-b-2 border-slate-600">
        <Box className="flex items-center gap-2 max-w-[70%] overflow-hidden">
          <Avatar
            name={formattedSender === "You" ? authUser.username : sender}
            size={22}
            round="5px"
          />
          <span className="text-white text-sm truncate whitespace-nowrap overflow-hidden">
            {formattedSender}
          </span>
        </Box>
        <span className="text-xs text-gray-400">{timestamp}</span>
      </Box>

      {/* Message content */}
      <Box className="font-semibold text-xl m-2 break-words">{message}</Box>
    </Box>
  );
};

export default Message;
