import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Spinner,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Input,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/UserStore";

const API_URL = import.meta.env.VITE_API_URL as string;

type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | null;

interface Event {
  _id: string;
  title: string;
  dateTime: string;
  clubId: {
    _id: string;
    name: string;
    description: string;
  };
  venueId: {
    _id: string;
    name: string;
    capacity: number;
  };
  totalTickets: number;
  availableTickets: number;
  isFree: boolean;
  bankNumber?: string;
  alreadyApplied?: ApplicationStatus;
  images?: string[];
}

interface Application {
  _id: string;
  eventId: string;
  userId: string;
  status: ApplicationStatus;
}

const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const userStore = useUserStore();

  // Получение всех заявок пользователя
  const fetchMyApplications = async () => {
    const res = await fetch(`${API_URL}/applications?userId=${userStore.user?.id}`);
    const data = await res.json();
    return data as Application[];
  };
// ==== ДО useEffect
const getApplicationStatusForEvent = (applications: Application[], eventId: string, userId: string): ApplicationStatus => {
  const userApplications = applications.filter(a => a.eventId === eventId && a.userId === userId);

  if (userApplications.some(app => app.status === "APPROVED")) {
    return "APPROVED";
  }

  if (userApplications.some(app => app.status === "PENDING")) {
    return "PENDING";
  }

  return null;
};

  useEffect(() => {
    const fetchEventsAndApplications = async () => {
      try {
        const [eventsRes, applicationsRes] = await Promise.all([
          fetch(`${API_URL}/events`),
          userStore.user ? fetchMyApplications() : Promise.resolve([]),
        ]);

        const eventsData = await eventsRes.json();
        const applications = applicationsRes;

        // Фильтруем заявки только пользователя и сохраняем их статусы
        // const applicationsByEvent = applications
        //   .filter((a) => a.userId === userStore.user?.id)
        //   .reduce((acc, curr) => {
        //     acc[curr.eventId] = curr.status;
        //     return acc;
        //   }, {} as Record<string, ApplicationStatus>);

          const updatedEvents = eventsData.map((event: Event) => ({
            ...event,
            alreadyApplied: getApplicationStatusForEvent(applications, event._id, userStore.user?.id ?? ""),
          }));
          

        setEvents(updatedEvents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsAndApplications();
  }, [userStore.user?.id]);

  const handleRegister = async () => {
    if (!selectedEvent || !userStore.user) return;

    console.log("Отправка регистрации", selectedEvent._id, userStore.user.id);

    try {
      const body = {
        eventId: selectedEvent._id,
        userId: userStore.user.id,
      };

      const res = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Не удалось зарегистрироваться");

      toast({
        title: "Успешно",
        description: "Вы зарегистрированы на событие!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();

      // Обновить статус события (уже зарегистрирован)
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === selectedEvent._id
            ? { ...event, alreadyApplied: "PENDING" }
            : event
        )
      );
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Ошибка при регистрации на событие.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading>Sxodim.SDU</Heading>

        <Text fontSize="lg" color="gray.600">
          Предстоящие события:
        </Text>

        {loading ? (
          <Spinner />
        ) : events.length === 0 ? (
          <Text>События не найдены.</Text>
        ) : (
          <Stack spacing={4} width="100%">
           {events.map((event) => (
  <Box
    key={event._id}
    p={4}
    borderWidth={1}
    borderRadius="md"
    boxShadow="md"
  >

    {event.images && event.images.length > 0 ? (
      <Box mb={3}>
<img
  src={`http://13.53.172.2${event.images[0]}`}
  alt={event.title}
  style={{ width: "100%", borderRadius: "8px", objectFit: "cover", maxHeight: "300px" }}
/>

      </Box>
    ) : (
      <Box mb={3}>
        <Text fontSize="sm" color="gray.400">
          Нет фото для этого события
        </Text>
      </Box>
    )}

    <Heading size="md" mb={2}>
      {event.title}
    </Heading>

    <Text>
      <strong>Дата и время:</strong> {new Date(event.dateTime).toLocaleString()}
    </Text>
    <Text>
      <strong>Бесплатно:</strong> {event.isFree ? "Да" : "Нет"}
    </Text>
    <Text>
      <strong>Доступно билетов:</strong> {event.availableTickets} из {event.totalTickets}
    </Text>
    <Text>
      <strong>Клуб:</strong> {event.clubId.name} — {event.clubId.description}
    </Text>
    <Text>
      <strong>Место проведения:</strong> {event.venueId.name} (Вместимость: {event.venueId.capacity})
    </Text>

    {event.alreadyApplied === 'PENDING' && (
      <Text mt={3} color="blue.500" fontWeight="bold">
        Вы уже подали заявку. Ожидается подтверждение.
      </Text>
    )}

    {event.alreadyApplied === 'APPROVED' && (
      <Text mt={3} color="green.500" fontWeight="bold">
        Ваша заявка одобрена! Билеты забронированы.
      </Text>
    )}

    {!event.alreadyApplied && (
      <Button
        mt={4}
        colorScheme="teal"
        onClick={() => {
          setSelectedEvent(event);
          onOpen();
        }}
      >
        Зарегистрироваться
      </Button>
    )}
  </Box>
))}

          </Stack>
        )}

        <Button colorScheme="gray" variant="link" as={RouterLink} to="/about">
          Перейти на страницу "О нас"
        </Button>
      </VStack>

      {/* Модальное окно */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Регистрация на событие</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Вы уверены, что хотите зарегистрироваться на событие:</Text>
            <Text fontWeight="bold" mt={2}>
              {selectedEvent?.title}
            </Text>

            {!selectedEvent?.isFree && (
              <Box mt={4}>
                <Text fontWeight="semibold" color="red.500">
                  Это платное событие. Оплатите по номеру карты:
                </Text>
                <Text mb={2}>
                  <strong>Карта:</strong> {selectedEvent?.bankNumber || "Не указан"}
                </Text>

                <Text mb={1}>Фото чека (необязательно):</Text>
                <Input
                  type="file"
                  accept="image/*"
                  disabled
                />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleRegister}>
              Подтвердить
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomePage;
