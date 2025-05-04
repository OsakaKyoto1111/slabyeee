import { Box, Flex, Text, Link, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" px={6} py={6} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={4}
      >
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} ADA. All rights reserved.
        </Text>

        <HStack spacing={6}>
          <Link href="/" color="gray.600">
            Home
          </Link>
          <Link href="/about" color="gray.600">
            About
          </Link>
          <Link href="/contact" color="gray.600">
            Contact
          </Link>
          <Link href="/privacy-policy" color="gray.600">
            Privacy
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
