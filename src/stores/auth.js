import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";

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

  return {
    user,
    userLogin
  }
});

