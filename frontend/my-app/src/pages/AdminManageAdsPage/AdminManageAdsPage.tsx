import { useEffect, useState } from "react";
import { Box, Heading, VStack, Text, Button, useToast } from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL as string;

interface Ad {
  _id: string;
  title: string;
  description: string;
  images?: string[]; // Добавил images сюда
}

const AdminManageAdsPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const toast = useToast();

  const fetchAds = async () => {
    const res = await fetch(`${API_URL}/events`);
    const data = await res.json();
    setAds(data);
  };

  const deleteAd = async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.ok) {
      toast({ title: "Удалено", status: "success" });
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } else {
      toast({ title: "Ошибка удаления", status: "error" });
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Управление объявлениями</Heading>
      <VStack spacing={4} align="stretch">
        {ads.map((ad) => (
          <Box key={ad._id} borderWidth={1} p={4} borderRadius="md">
            
            {ad.images && ad.images.length > 0 ? (
              <Box mb={3}>
                <img
                  src={`http://13.53.172.2${ad.images[0]}`}
                  alt={ad.title}
                  style={{ width: "100%", borderRadius: "8px", objectFit: "cover", maxHeight: "300px" }}
                />
              </Box>
            ) : (
              <Box mb={3}>
                <Text fontSize="sm" color="gray.400">
                  Нет фото для этого объявления
                </Text>
              </Box>
            )}

            <Text fontWeight="bold">{ad.title}</Text>
            <Text>{ad.description}</Text>
            <Button mt={2} colorScheme="red" onClick={() => deleteAd(ad._id)}>
              Удалить
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminManageAdsPage;
