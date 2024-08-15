import { useUserStore } from "../stores/user";
import { navigateTo } from "#app";

// Middleware in TypeScript for route protection
export default defineNuxtRouteMiddleware((to, from) => {
  // Access the Pinia store
  const userStore = useUserStore();

  // Check if the user is registered
  const isRegistered = userStore.isRegistered;

  // Redirect to the register page if the user is not registered and not on the register page
  if (!isRegistered && to.name != "register" && to.name !== "login") {
    return navigateTo("/register");
  }
});
