import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  Button,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { useUserStore } from "@store/UserStore";

const API_URL = import.meta.env.VITE_API_URL as string;

interface Application {
  _id: string;
  userId: {
    fullName: string;
    email: string;
  };
  eventId: {
    _id: string;
    title: string;
    dateTime: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const ApplicationRequestsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const userStore = useUserStore();

  const fetchApplications = async () => {
    const res = await fetch(`${API_URL}/clubs/applications/${userStore.user?.id}`);
    const data = await res.json();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    const res = await fetch(`${API_URL}/applications/${id}/${action}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userStore.user?.id }),
    });

    if (res.ok) {
      toast({
        title: "Успешно",
        description: action === "approve" ? "Заявка одобрена" : "Заявка отклонена",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchApplications();
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить действие",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge colorScheme="green">Одобрено</Badge>;
      case "REJECTED":
        return <Badge colorScheme="red">Отклонено</Badge>;
      default:
        return <Badge colorScheme="gray">В ожидании</Badge>;
    }
  };

  if (loading) return <Spinner mt={10} />;

  return (
    <Box p={6}>
      <Heading mb={6}>Заявки на события</Heading>
      <Stack spacing={6}>
        {applications.length === 0 && <Text>Заявок нет.</Text>}
        {applications.map((app) => (
          <Box
            key={app._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
          >
            <Text><strong>Пользователь:</strong> {app.userId.fullName} ({app.userId.email})</Text>
            <Text><strong>Событие:</strong> {app.eventId.title}</Text>
            <Text><strong>Дата:</strong> {new Date(app.eventId.dateTime).toLocaleString()}</Text>
            <Text><strong>Статус:</strong> {renderStatusBadge(app.status)}</Text>

            {app.status === "PENDING" && (
              <Stack direction="row" mt={3}>
                <Button
                  colorScheme="green"
                  onClick={() => handleAction(app._id, "approve")}
                >
                  Принять
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleAction(app._id, "reject")}
                >
                  Отклонить
                </Button>
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ApplicationRequestsPage;
