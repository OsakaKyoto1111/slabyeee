import { Box, Heading, Text, VStack, Image, HStack, Link } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Box p={8}>
      <VStack spacing={6} align="start">
        <Heading>Sxodim.SDU</Heading>

        <Image 
          src="https://source.unsplash.com/featured/?university,event" 
          alt="University Event" 
          borderRadius="md" 
          w="100%" 
          maxH="300px" 
          objectFit="cover"
        />

        <Text fontSize="lg" color="gray.600">
          Sxodim.SDU — это современная платформа для студентов SDU, которая помогает быть в курсе всех мероприятий университета. 
          Здесь вы можете узнать о предстоящих событиях, приобрести билеты и получить персональные рекомендации.
        </Text>

        <Text fontSize="md" color="gray.500">
          Платформа объединяет более 40 студенческих клубов и организаций SDU. Благодаря удобному интерфейсу и системе уведомлений 
          вы никогда не пропустите важное событие.
        </Text>

        <Text fontSize="md" color="gray.500">
          Проект разработан с использованием React, Chakra UI, MobX и Prisma. Мы стремимся сделать социальную жизнь студентов проще и интереснее.
        </Text>

        <Text fontSize="md" color="gray.500">
          Также у нас есть мобильное приложение, которое вы можете скачать в Google Play и App Store.
        </Text>

        <HStack spacing={6}>
          <Link href="https://play.google.com/store" isExternal>
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Google Play" 
              height="60px" 
            />
          </Link>

          <Link href="https://www.apple.com/app-store/" isExternal>
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" 
              alt="App Store" 
              height="60px" 
            />
          </Link>
        </HStack>

        <Text fontSize="md" color="gray.500">
          Для навигации используйте меню вверху страницы. Вы можете вернуться на главную страницу или перейти к контактам.
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutPage;
