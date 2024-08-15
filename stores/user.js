// stores/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isRegistered: false,
  }),
  actions: {
    setRegistered(status) {
      this.isRegistered = status;
    },
    registerUser() {
      // Registration logic here
      this.setRegistered(true);
    },
  },
});
