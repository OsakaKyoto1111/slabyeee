import { Box, Button, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

const AdminPage = () => {
  const toast = useToast();

  // Клуб
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");

  // Зал
  const [venueName, setVenueName] = useState("");
  const [venueCapacity, setVenueCapacity] = useState("");

  const createClub = async () => {
    try {
      const response = await fetch(`${API_URL}/clubs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: clubName,
          description: clubDescription,
        }),
      });

      if (!response.ok) throw new Error("Ошибка создания клуба");
      toast({ title: "Клуб создан", status: "success" });
      setClubName("");
      setClubDescription("");
    } catch (error) {
      toast({ title: "Ошибка", description: (error as Error).message, status: "error" });
    }
  };

  const createVenue = async () => {
    try {
      const response = await fetch(`${API_URL}/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: venueName,
          capacity: Number(venueCapacity),
        }),
      });

      if (!response.ok) throw new Error("Ошибка создания зала");
      toast({ title: "Зал создан", status: "success" });
      setVenueName("");
      setVenueCapacity("");
    } catch (error) {
      toast({ title: "Ошибка", description: (error as Error).message, status: "error" });
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Админка</Heading>

      <Heading size="md" mb={2}>Создать клуб</Heading>
      <VStack spacing={3} mb={6}>
        <Input placeholder="Название клуба" value={clubName} onChange={(e) => setClubName(e.target.value)} />
        <Input placeholder="Описание" value={clubDescription} onChange={(e) => setClubDescription(e.target.value)} />
        <Button onClick={createClub} colorScheme="teal">Создать клуб</Button>
      </VStack>

      <Heading size="md" mb={2}>Создать зал</Heading>
      <VStack spacing={3}>
        <Input placeholder="Название зала" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
        <Input placeholder="Вместимость" value={venueCapacity} onChange={(e) => setVenueCapacity(e.target.value)} />
        <Button onClick={createVenue} colorScheme="blue">Создать зал</Button>
      </VStack>
    </Box>
  );
};

export default AdminPage;
