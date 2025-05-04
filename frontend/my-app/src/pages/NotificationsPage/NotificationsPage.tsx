import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useUserStore } from "@store/UserStore";

const API_URL = import.meta.env.VITE_API_URL as string;

interface Notification {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
  };
  eventId: {
    _id: string;
    title: string;
  };
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userStore = useUserStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userStore.user?.id) return;

      try {
        const res = await fetch(`${API_URL}/notifications/user/${userStore.user.id}`);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Ошибка получения уведомлений", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userStore.user?.id]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "PUT",
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Ошибка при отметке как прочитанное", err);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Мои уведомления</Heading>

      {loading ? (
        <Spinner />
      ) : notifications.length === 0 ? (
        <Text>Уведомлений пока нет.</Text>
      ) : (
        <VStack spacing={4} align="start" width="100%">
          {notifications.map((notification) => (
            <Box
              key={notification._id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg={notification.isRead ? "gray.50" : "blue.100"}
              width="100%"
            >
              <Text fontWeight="bold">
                {notification.title}{" "}
                {!notification.isRead && (
                  <Badge colorScheme="green">Новое</Badge>
                )}
              </Text>
              <Text>{notification.message}</Text>
              <Text fontSize="xs" color="gray.500" mt={1}>
                {new Date(notification.createdAt).toLocaleString()}
              </Text>

              {!notification.isRead && (
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => markAsRead(notification._id)}
                >
                  Пометить как прочитанное
                </Button>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default NotificationsPage;
