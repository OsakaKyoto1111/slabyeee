import { Routes, Route } from "react-router-dom";
import navigationLinks from "../config/navigationLinks";
import ProtectedRoute from "@pages/ProtectedRoute/ProtectedRoute";

const pages = import.meta.glob("../pages/**/*.tsx", { eager: true }) as Record<string, { default: React.ComponentType }>;

const pageMap: Record<string, React.ComponentType> = {};

Object.keys(pages).forEach((key) => {
  const name = key.split("/").pop()?.replace(".tsx", "") || "";
  pageMap[name] = pages[key].default;
});

function AppRoutes() {
  return (
    <Routes>
      {navigationLinks.map((link) => {
        const Component = pageMap[link.name];
        if (!Component) {
          console.error(`Component for ${link.name} not found`);
          return null;
        }

        return (
          <Route
            key={link.id}
            path={link.path}
            element={
              <ProtectedRoute guestOnly={link.guestOnly} roles={link.roles}>
                <Component />
              </ProtectedRoute>
            }
          />
        );
      })}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
