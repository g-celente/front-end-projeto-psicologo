import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});

  async function userLogin(payload) {
    try {
      const response = await api.auth.userLogin(payload);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function userLogout() {
    try {
      const response = await api.auth.userLogout();

      return response.data;
    } catch (error) {}
  }

  return {
    user,
    userLogin,
    userLogout
  }
});

