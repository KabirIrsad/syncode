// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import Avatar from "react-avatar";

// eslint-disable-next-line react/prop-types
const Client = ({ username }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontWeight="semibold"
      textAlign="center"
      width="80px"           // fixed width for the card
    >
      <Avatar
        name={username}
        size={50}
        round="10px"
      />

      <Tooltip label={username} placement="top" hasArrow>
        <Text
          mt={1}
          fontSize="sm"
          noOfLines={1}         // limit to 1 line
          isTruncated           // show "…"
          maxW="full"
        >
          {username}
        </Text>
      </Tooltip>
    </Box>
  );
};

export default Client;
