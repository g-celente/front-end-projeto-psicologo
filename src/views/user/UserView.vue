<script setup>
import { ref, onMounted, watch } from "vue";

import BaseNavbar from "@/components/navbar/BaseNavbar.vue";
import BaseSidebar from "@/components/sidebar/BaseSidebar.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import { userStore } from "@/stores/user.js";
import UserImageModal from "./partials/UserImageModal.vue";

import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseModal from "@/components/modal/BaseModal.vue";

const usersStore = userStore();
const { userPerfil } = usersStore;

const openModal = ref(false);

const textSuccess = ref(null);
const textError = ref(null);

const loading = ref(false);
const user = ref(null);

const actualPassword = ref("");
const newPassword = ref("");

const disableEdit = ref(true);
const success = ref(false);
const error = ref(false);

const initFunction = async () => {
  loading.value = true;
  user.value = await userPerfil();
  loading.value = false;
};

const handleUpdate = async () => {
  const response = await editUserProfile(user.value);
  console.log(response);
  if (response) {
    textSuccess.value = "Credenciais Editadas com Sucesso!!";
    success.value = true;

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    textError.value = "Falha ao Editar Credenciais!!!";
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

const cancel = (ev) => {
  openModal.value = ev;
};

const refreshList = async (event) => {
  openModal.value = false;
  await initFunction();
};

const handleUpdatePassword = async () => {
  const payload = {
    senha_atual: actualPassword.value,
    nova_senha: newPassword.value,
  };

  const response = await editUserPassword(payload);
  if (response) {
    textSuccess.value = "Senha Editada com Sucesso!!";
    success.value = true;

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    textError.value = "Senha Atual Incorreta!";
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

onMounted(async () => {
    await initFunction();
});
</script>

<template>
    <BaseNavbar />
    <BaseSidebar />
    <div class="page-background flex flex-col items-center p-8 sm:p-4 h-full">
      <div v-if="!loading && user" class="container w-[600px] sm:w-full sm:p-2 pt-5 flex flex-col justify-center">
        <div class="user-img flex gap-1 items-center mb-5">
          <img
            src="../../assets/img/png/user_default_large.png"
            alt=""
            width="200px"
            v-if="!user.user_img"
          />
          <img
            :src="user.user_img"
            alt=""
            v-else
            class="w-[200px] h-[200px] object-cover rounded-full"
          />
          <BaseButton label="Alterar Foto" @click="openModal = true" />
        </div>
        <h2 class="mt-4 mb-3 text-[27px] sm:text-base">Dados do Usuário:</h2>
        <div class="input-container mb-3">
          <label>Nome de Usuário:</label>
          <BaseInput class="p-3 sm:p-2" v-model="user.nome" :disabled="disableEdit" />
        </div>
        <div class="input-container mb-3">
          <label>Email:</label>
          <BaseInput class="p-3 sm:p-2" v-model="user.email" :disabled="disableEdit" />
        </div>
        <div class="btns flex justify-end gap-2 mt-4 mb-4">
          <BaseButton class="bg-[#2D2D2D] text-white" label="Editar" @click="disableEdit = !disableEdit" />
          <BaseButton label="Salvar" :disabled="disableEdit" @click="handleUpdate" />
        </div>
  
        <h2 class="mb-3 text-[27px] sm:text-base">Nova Senha:</h2>
        <div class="input-container mb-3">
          <label>Senha Atual:</label>
          <BaseInput class="p-3 sm:p-2" type="password" v-model="actualPassword" />
        </div>
        <div class="input-container mb-3">
          <label>Nova Senha:</label>
          <BaseInput class="p-3 sm:p-2" type="password" v-model="newPassword" />
        </div>
        <div class="btns flex justify-end gap-2 mt-4">
          <BaseButton label="Mudar Senha" @click="handleUpdatePassword" :disabled="!newPassword || !actualPassword" />
        </div>
      </div>
  
      <UserImageModal
        :open="openModal"
        @update:open="cancel($event)"
        @update:refresh="refreshList($event)"
        :info="user"
      />
  
      <BaseAlertError v-if="error" class="alert" :text="textError" />
      <BaseAlertSuccess v-if="success" class="alert" :text="textSuccess" />
    </div>
</template>
  

<style scoped lang="scss">
.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    .loading-icon > svg {
      width: 100px;
      height: 100px;
    }
  }
}

.btns {
  justify-content: end;
}

.container {
  width: 600px;

  @media (max-width: 1100px) {
    width: 100%;
    padding: 10px;

    h2 {
      font-size: 27px;
    }

    .input {
      padding: 8px;
    }
  }
}

.input {
  padding: 12px;
}

.edit-btn {
  background-color: rgb(45, 45, 45);
  color: #fff;
}

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  margin-left: 200px;
  @media (max-width: 630px) {
    padding: 1rem;
  }
}
</style>