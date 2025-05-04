export interface RouteConfig {
    id: number;
    path: string;
    name: string; 
    label?: string;
    showInNavbar?: boolean;
    protected?: boolean;   
    guestOnly?: boolean; 
    roles?: Array<"HEAD" | "CLIENT" | "DRIVER" | "USER" | "HEAD" | "ADMIN">; // только массив!
}

const navigationLinks: RouteConfig[] = [
    { id: 1, path: "/", name: "HomePage", label: "Главная", showInNavbar: true },
    { id: 2, path: "/about", name: "AboutPage", label: "О нас", showInNavbar: true },
    { id: 3, path: "/contact", name: "ContactPage", label: "Контакты", showInNavbar: true },
    { id: 4, path: "/login", name: "LoginPage", label: "Login", guestOnly: true },
    { id: 5, path: "/register", name: "RegistrationPage", label: "Register", guestOnly: true },
    { id: 6, path: "/profile", name: "profile", label: "Профиль", protected: true },
    { id: 7, path: "/create-event", name: "headProfile", label: "Создать ивент", protected: true, roles: ["HEAD", "ADMIN"], showInNavbar: true },
    { id: 8, path: "/admin", name: "AdminPage", label: "Админка", protected: true, roles: ["ADMIN"], showInNavbar: true },
    { 
        id: 9, 
        path: "/manage-ads", 
        name: "AdminManageAdsPage", 
        label: "Управление объявлениями", 
        protected: true, 
        roles: ["ADMIN"], 
        showInNavbar: true 
      },
      {
        id: 10,
        path: "/applications",
        name: "ApplicationRequestsPage",
        label: "Заявки",
        protected: true,
        roles: ["HEAD"],
        showInNavbar: true
      },
      {
        id: 11,
        path: "/admin/clubs",
        name: "AdminClubsPage",
        label: "Клубы",
        protected: true,
        roles: ["ADMIN"],
        showInNavbar: true,
      },
      {
        id: 11,
        path: "/notifications",
        name: "NotificationsPage",
        label: "Мои заявки",
        protected: true,
        roles: ["USER"],
        showInNavbar: true,
      }
      
      
];

export default navigationLinks;
