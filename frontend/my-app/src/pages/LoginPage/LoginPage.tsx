import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  VStack, 
  useToast 
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/UserStore";

const API_URL = import.meta.env.VITE_API_URL as string;

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();
  const userStore = useUserStore();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите email и пароль.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    // Проверяем домен email
    if (!email.endsWith("@sdu.edu.kz")) {
      toast({
        title: "Ошибка",
        description: "Email должен быть на домене @sdu.edu.kz",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка входа");
      }
  
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      await userStore.fetchProfile();
  
      toast({
        title: "Успешно",
        description: "Вы успешно вошли в систему!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
  
      setEmail("");
      setPassword("");
    } catch (error) {
      let errorMessage = "Произошла ошибка";
  
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      toast({
        title: "Ошибка входа",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box maxW="400px" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading mb={6} textAlign="center">
        Вход
      </Heading>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            value={email} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
            placeholder="Введите email" 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input 
            type="password" 
            value={password} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
            placeholder="Введите пароль" 
          />
        </FormControl>

        <Button 
          colorScheme="teal" 
          width="100%" 
          onClick={handleLogin} 
          isLoading={loading}
        >
          Войти
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
