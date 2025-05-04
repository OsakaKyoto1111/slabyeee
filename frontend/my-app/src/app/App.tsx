import { ChakraProvider, Box, Container, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@routes/AppRoutes";
import Header from "@shared/components/header/Header";
import Footer from "@shared/components/footer/Footer";

const theme = extendTheme({});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Box minH="100vh" display="flex    )
" flexDirection="column" >
  <Header />

  <Box flex="1">
    <Container maxW="container.lg" py={6}>
      <AppRouter />
    </Container>
  </Box>

  <Footer />
</Box>

      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
