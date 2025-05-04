import { Box, Heading, Text, VStack, Link } from "@chakra-ui/react";

const ContactPage = () => {
  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading>Contact Us</Heading>

        <Text fontSize="lg" color="gray.600">
          If you have any questions, feel free to reach out to us.
        </Text>

        <Text fontSize="md" color="gray.500">
          Email us at{" "}
          <Link href="mailto:support@myapp.com" color="teal.500" isExternal>
            support@myapp.com
          </Link>
        </Text>

        <Text fontSize="md" color="gray.500">
          Or visit our office at: Almaty, Kazakhstan
        </Text>
      </VStack>
    </Box>
  );
};

export default ContactPage;
