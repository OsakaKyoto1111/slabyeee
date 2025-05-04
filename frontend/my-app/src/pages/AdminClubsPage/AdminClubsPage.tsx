import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL as string;

interface Club {
  _id: string;
  name: string;
  description: string;
  owner?: {
    _id: string;
    fullName: string;
    email: string;
  };
}

const AdminClubsPage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [emailInputs, setEmailInputs] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch(`${API_URL}/clubs`);
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось получить список клубов.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAssignHead = async (clubId: string) => {
    const email = emailInputs[clubId];

    if (!email) {
      toast({
        title: "Ошибка",
        description: "Введите email пользователя.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/clubs`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, clubId }), // <<< ВАЖНО clubId теперь добавлен сюда!
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Ошибка назначения Head");
      }

      toast({
        title: "Успешно",
        description: "Пользователь назначен HEAD клуба.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Обновляем локально данные
      setClubs((prevClubs) =>
        prevClubs.map((club) =>
          club._id === clubId ? { ...club, owner: result.club.owner } : club
        )
      );

      // Очищаем email
      setEmailInputs((prev) => ({ ...prev, [clubId]: "" }));
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Произошла ошибка при назначении.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Управление клубами</Heading>

      <VStack spacing={6} align="stretch">
        {clubs.map((club) => (
          <Box
            key={club._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="bold" fontSize="lg">{club.name}</Text>
            <Text mb={2}>{club.description}</Text>

            <Text>
              <strong>Владелец (Head):</strong>{" "}
              {club.owner
                ? `${club.owner.fullName} (${club.owner.email})`
                : "Не назначен"}
            </Text>

            <Input
              placeholder="Введите email для назначения Head"
              value={emailInputs[club._id] || ""}
              onChange={(e) =>
                setEmailInputs((prev) => ({
                  ...prev,
                  [club._id]: e.target.value,
                }))
              }
              mt={3}
            />
            <Button
              mt={2}
              colorScheme="teal"
              onClick={() => handleAssignHead(club._id)}
            >
              Назначить Head
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminClubsPage;
