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

  async function uploadImg(formData) {
    try {
      const response = await api.user.uploadImg(formData); // Envia o formData com a imagem
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function alterPassword(payload) {
    try {
      const response = await api.user.alterPassword(payload)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
    
  }

  return {
    user,
    userPerfil,
    uploadImg,
    alterPassword
  }
});

