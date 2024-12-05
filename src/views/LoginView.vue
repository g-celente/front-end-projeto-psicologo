<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { watch } from "vue";

const authStore = useAuthStore();
const { userLogin } = authStore;

const error = ref(false);
const router = useRouter();
const disabled = ref(true);

const payload = ref({
  email: "",
  senha: "",
});

const handleSubmit = async () => {
  const login = await userLogin(payload.value);

  if (login) {
    localStorage.setItem("token-auth", login.token);

    router.push({ path: "/perfil" });
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

watch(payload.value, () => {
  if (payload.value.email.length > 1 && payload.value.senha.length > 1) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
});
</script>



<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
      <!-- left side -->
      <div class="flex flex-col justify-center p-8 md:p-14">
        <span class="mb-3 text-4xl font-bold">Bem Vindo De Volta!</span>
        <span class="font-light text-gray-400 mb-8">
          Login! Por Favor, faça seu login
        </span>
        <div class="py-4">
          <span class="mb-2 text-md">Email</span>
          <input
            type="text"
            v-model="payload.email"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            placeholder="Entre com seu email"
          />
        </div>
        <div class="py-4">
          <span class="mb-2 text-md">Senha</span>
          <input
            type="password"
            v-model="payload.senha"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            placeholder="Entre com sua senha"
          />
        </div>
        <div class="flex justify-between w-full py-4">
          <div class="mr-24">
            <input type="checkbox" class="mr-2" />
            <span class="text-md">Relembrar por 30 dias</span>
          </div>
          <span class="font-bold text-md"><router-link to="/forgotPassword">Esqueci minha senha</router-link></span>
        </div>
        <button
          @click="handleSubmit"
          class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
        >
          Entrar
        </button>
        <button
          class="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
        >
          <img src="../assets/img/google.svg" alt="img" class="w-6 h-6 inline mr-2" />
          Entrar com google 
        </button>
      </div>
      <!-- right side -->
      <div class="relative">
        <img
          src="../assets/img/image.jpg"
          alt="img"
          class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos personalizados aqui */
</style>