import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";
import router from "@/router/index.js";

export const userStore = defineStore("user", () => {
  const user = ref({});

  async function userPerfil() {
    try {
      const response = await api.user.userPerfil();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    user,
    userPerfil,
  }
});

