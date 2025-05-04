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

const API_URL = import.meta.env.VITE_API_URL as string;

const RegistrationPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate(); // Для редиректа

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    // Проверка email на домен sdu.edu.kz
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName: username,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка регистрации");
      }
  
      const responseData = await response.json();
  
      localStorage.setItem("token", responseData.token);
  
      toast({
        title: "Успешно",
        description: "Регистрация прошла успешно!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      setTimeout(() => {
        navigate("/login");
      }, 1500);
  
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      let errorMessage = "Произошла ошибка";
  
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      toast({
        title: "Ошибка",
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
        Регистрация
      </Heading>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Имя пользователя</FormLabel>
          <Input 
            value={username} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} 
            placeholder="Введите имя пользователя" 
          />
        </FormControl>

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

        <FormControl isRequired>
          <FormLabel>Подтвердите пароль</FormLabel>
          <Input 
            type="password" 
            value={confirmPassword} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} 
            placeholder="Повторите пароль" 
          />
        </FormControl>

        <Button 
          colorScheme="teal" 
          width="100%" 
          onClick={handleRegister} 
          isLoading={loading}
        >
          Зарегистрироваться
        </Button>
      </VStack>
    </Box>
  );
};

export default RegistrationPage;
