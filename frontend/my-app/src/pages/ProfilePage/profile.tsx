import { Box, Heading, Text } from "@chakra-ui/react";
import { useUserStore } from "@store/UserStore";
import { observer } from "mobx-react-lite";

const ProfilePage = () => {
  const userStore = useUserStore();
  const user = userStore.user;

  if (!user) return <Text>Загрузка...</Text>;

  return (
    <Box p={6}>
      <Heading mb={4}>Профиль пользователя</Heading>

      <Text><strong>Имя:</strong> {user.name}</Text>
      <Text><strong>Email:</strong> {user.email}</Text>
      <Text><strong>Роль:</strong> {user.role}</Text>

      <Heading size="md" mt={6}>Дополнительно</Heading>

      <Text>Количество билетов: (нужно добавить в userStore если надо)</Text>
      <Text>Количество платежей: (нужно добавить в userStore если надо)</Text>
      <Text>Количество уведомлений: (нужно добавить в userStore если надо)</Text>
    </Box>
  );
};

export default observer(ProfilePage);
