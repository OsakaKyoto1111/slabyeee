import { Box, Flex, Button, HStack, Image } from "@chakra-ui/react";
import navigationLinks from "@config/navigationLinks";
import { useUserStore } from "@store/UserStore";
import { observer } from "mobx-react-lite";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const navLinks = navigationLinks.filter((link) => {
    if (!link.showInNavbar) return false;
  
    // Если пользователь — ADMIN, скрываем "О нас" и "Контакты"
    if (
      userStore.user?.role === "ADMIN" &&
      (link.name === "AboutPage" || link.name === "ContactPage")
    ) {
      return false;
    }
  
    // Если есть ограничение по ролям — проверяем роль
    if (link.roles && (!userStore.user || !link.roles.includes(userStore.user.role))) {
      return false;
    }
  
    return true;
  });
  

  return (
    <Box as="header" bg="gray.100" px={6} py={4} boxShadow="sm">
      <Flex align="center" justify="space-between">
        <Link to="/">
          <HStack spacing={3} cursor="pointer">
            <Image src="/sxodim_logo.png" alt="ADA" boxSize="64px" transform="scale(1.8)" />
          </HStack>
        </Link>

        <HStack gap={6}>
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "teal" : "gray",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </HStack>

        <HStack gap={4}>
          {userStore.isLoggedIn ? (
            <>
              <Button colorScheme="teal" size="sm" onClick={() => navigate("/profile")}>
                Профиль
              </Button>
              <Button colorScheme="red" size="sm" onClick={() => userStore.logout()}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button colorScheme="teal" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button colorScheme="blue" size="sm" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default observer(Header);
