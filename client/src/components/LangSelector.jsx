import { HStack, Text, Button, Menu, MenuButton, MenuList, MenuItem, Badge } from "@chakra-ui/react";
import { BiChevronDown } from 'react-icons/bi';
import { LANGUAGE_VERSIONS } from "../constants";

// eslint-disable-next-line react/prop-types
const LangSelector = ({ language, onSelect }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);
  // Dark theme colors
  const menuBg = "gray.700";
  const btnBg = "gray.800";
  const hoverBg = "gray.600";
  const borderColor = "gray.600";
  const textColor = "white";

  return (
    <HStack spacing={3} mb={4} align="center">
      <Text fontSize="lg" fontWeight="bold" color={textColor}>
        Language:
      </Text>

      <Menu isLazy>
        <MenuButton
          as={Button}
          rightIcon={<BiChevronDown color="white" />}
          variant="solid"
          bg={btnBg}
          color={textColor}
          borderColor={borderColor}
          _hover={{ bg: hoverBg }}
        >
          {language}
        </MenuButton>

        <MenuList
          bg={menuBg}
          borderColor={borderColor}
          maxH="250px"
          overflowY="auto"
          color={textColor}
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              onClick={() => onSelect(lang)}
              bg={menuBg}
              _hover={{ bg: hoverBg }}
            >
              <HStack justify="space-between" w="full">
                <Text>{lang}</Text>
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  fontSize="0.7em"
                >
                  {version}
                </Badge>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default LangSelector;