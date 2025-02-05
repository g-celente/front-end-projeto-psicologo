<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";

const authStore = useAuthStore();
const { userLogin } = authStore;

const error = ref(false);
const router = useRouter();
const disabled = ref(true);
const loading = ref(false);

const payload = ref({
  email: "",
  senha: "",
});

const handleSubmit = async () => {
  loading.value = true;
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
  loading.value = false;
};

const handleKeyPress = (event) => {
  if (event.key === "Enter" && !disabled.value) {
    handleSubmit();
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
  <div class="content min-h-screen flex flex-col items-center justify-center">
    <div class="box relative flex flex-col m-6 space-y-8 bg-transparent border-2 border-orange-500 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
      <!-- left side -->
      <div class="box flex flex-col justify-center p-8 items-center"> <!-- Padding ajustado -->
        <img src="../assets/img/logo freud.png" alt="Logo" class="w-32 h-32 mb-6" />
        <span class="mb-3 text-4xl font-bold text-white">Bem Vindo De Volta!</span>
        <span class="font-light text-gray-300 mb-8">
          Login! Por favor, faça seu login
        </span>
        <div class="div-input py-4 w-full">
          <span class="mb-2 text-md text-white">Email</span>
          <input
            type="text"
            v-model="payload.email"
            class="input w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            placeholder="Entre com seu email"
            @input="(ev) => (payload.email = ev.target.value)"
            @keydown="handleKeyPress"
          />
        </div>
        <div class="div-input py-4 w-full">
          <span class="mb-2 text-md text-white">Senha</span>
          <input
            type="password"
            v-model="payload.senha"
            class="input w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            placeholder="Entre com sua senha"
            @keydown="handleKeyPress"
          />
        </div>
        <div class="flex justify-between w-full py-4">
          <div class="mr-24">
            <input type="checkbox" class="mr-2" />
            <span class="text-md text-white">Relembrar por 30 dias</span>
          </div>
          <span class="font-bold text-md text-orange-500"><router-link to="/forgotPassword">Esqueci minha senha</router-link></span>
        </div>
        <button
          @click="handleSubmit"
          class="w-full bg-orange-500 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500"
        >
          Entrar
        </button>
      </div>
    </div>
    <BaseAlertError
      v-if="error"
      key="0"
      type="error"
      text="Email ou senha incorretos"
    />
  </div>
</template>

<style scoped>
.content {
  background-image: url('../assets/img/Sigmund-Freuds-Life-Lessons-You-Should-Know-Before-You-Get-Old.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Overlay escurecendo o fundo */
  z-index: -1;
}

.bg-transparent {
  background-color: rgba(0, 0, 0, 0.5); /* Transparência no formulário */
}

.border-orange-500 {
  border-color: #FFA500; /* Cor laranja para a borda */
}

.text-white {
  color: white;
}

input {
  width: 100%;
}


@media (max-width: 630px) {
  .box {
    width: 100%;
    max-width: 90%; /* Para garantir que a largura não ultrapasse */
    align-items: center;
    justify-content: center;
    margin: auto;
    text-align: center;
  }

  .input {
    width: 100%;
    text-align: left; /* Ajustar para ocupar a largura total do container */
  }

  .div-input {
    width: 100%; /* Inputs ocupando 100% da largura do container */
    display: flex;
    flex-direction: column; /* Centralizar os inputs horizontalmente */
    text-align: left;
  }
}

</style>
