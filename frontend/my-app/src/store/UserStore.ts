import { makeAutoObservable } from "mobx";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "HEAD" | "ADMIN";
}

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchProfile();
  }

  setUser(user: User) {
    this.user = user;
  }

  logout() {
    this.user = null;
    localStorage.removeItem("token");
  }

  get isLoggedIn() {
    return !!this.user;
  }

  async fetchProfile() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const userId = decoded.userId;

      const API_URL = import.meta.env.VITE_API_URL as string;

      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Не удалось получить профиль");

      const profile = await response.json();

      this.setUser({
        id: profile._id,
        name: profile.fullName,
        email: profile.email,
        role: profile.role, // вот это обязательно!
      });
    } catch (err) {
      console.error("Ошибка загрузки профиля", err);
      this.logout();
    }
  }
}

export const userStore = new UserStore();
export const useUserStore = () => userStore;
