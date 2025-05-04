import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Checkbox,
  useToast,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL as string;

interface Club {
  _id: string;
  name: string;
}

interface Venue {
  _id: string;
  name: string;
}

const HeadEventCreatePage = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [clubId, setClubId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [isFree, setIsFree] = useState(true);
  const [bankNumber, setBankNumber] = useState("");
  const [images, setImages] = useState<File[]>([]); // <---- Фото

  const [clubs, setClubs] = useState<Club[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const [clubsRes, venuesRes] = await Promise.all([
        fetch(`${API_URL}/clubs`),
        fetch(`${API_URL}/venues`),
      ]);

      const clubsData = await clubsRes.json();
      const venuesData = await venuesRes.json();

      setClubs(clubsData);
      setVenues(venuesData);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!title || !dateTime || !clubId || !venueId || !totalTickets) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isFree && !bankNumber) {
      toast({
        title: "Ошибка",
        description: "Для платных событий введите номер банка.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("dateTime", dateTime);
      formData.append("clubId", clubId);
      formData.append("venueId", venueId);
      formData.append("totalTickets", String(totalTickets));
      formData.append("isFree", String(isFree));
      formData.append("bankNumber", isFree ? "" : bankNumber);

      // Добавляем изображения в FormData
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        body: formData, // ВАЖНО: НЕ УКАЗЫВАТЬ Content-Type → браузер сам ставит multipart/form-data
      });

      if (!response.ok) throw new Error("Ошибка создания события");

      toast({
        title: "Успех",
        description: "Событие успешно создано!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Очистка полей после успешной отправки
      setTitle("");
      setDateTime("");
      setClubId("");
      setVenueId("");
      setTotalTickets(0);
      setIsFree(true);
      setBankNumber("");
      setImages([]);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать событие.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Создать новое событие</Heading>

      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Название события</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите название" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Дата и время</FormLabel>
          <Input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Клуб</FormLabel>
          <Select value={clubId} onChange={(e) => setClubId(e.target.value)} placeholder="Выберите клуб">
            {clubs.map((club) => (
              <option key={club._id} value={club._id}>
                {club.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Место проведения</FormLabel>
          <Select value={venueId} onChange={(e) => setVenueId(e.target.value)} placeholder="Выберите место">
            {venues.map((venue) => (
              <option key={venue._id} value={venue._id}>
                {venue.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Количество билетов</FormLabel>
          <Input type="number" value={totalTickets} onChange={(e) => setTotalTickets(Number(e.target.value))} />
        </FormControl>

        <FormControl>
          <Checkbox isChecked={isFree} onChange={(e) => setIsFree(e.target.checked)}>
            Бесплатное событие
          </Checkbox>
        </FormControl>

        {!isFree && (
          <FormControl isRequired>
            <FormLabel>Номер банка</FormLabel>
            <Input value={bankNumber} onChange={(e) => setBankNumber(e.target.value)} placeholder="Введите номер банка" />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Фото события</FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setImages(Array.from(e.target.files));
              }
            }}
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Создать событие
        </Button>
      </VStack>
    </Box>
  );
};

export default HeadEventCreatePage;
