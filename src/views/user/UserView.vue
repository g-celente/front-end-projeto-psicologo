<script setup>
import { ref, onMounted, watch } from "vue";

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
const { alterPassword } = usersStore;

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
  user.value = await userPerfil();
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
    newPassword: newPassword.value,
  };

  const response = await alterPassword(payload);
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
    loading.value = true
    await initFunction();
    loading.value = false
});
</script>

<template>
  <div class="page-background flex flex-col items-center justify-center p-8 sm:p-4 h-full max-w-[100%]">
    <div v-if="!loading && user" class="container mx-auto flex flex-col items-center w-full sm:w-full p-4">
      <div class="flex gap-4 flex-wrap justify-center items-start w-full">
        <!-- Primeira linha com 2 boxes -->
        <div class="flex flex-col sm:flex-row gap-8 justify-center w-full sm:w-[100%]">
          <!-- Box 1: Imagem e Dados do Usuário -->
          <div class="w-full sm:w-[50%] bg-[#2B1511] border border-gray-200 rounded-lg shadow dark:bg-[#2B1511] dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
              <img
                :src="user.user_img || '../../assets/img/user_default_large.png'"
                alt="User Image"
                class="w-24 h-24 mb-3 rounded-full shadow-lg object-cover mt-5"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ user.nome || 'Nome do Usuário' }}</h5>
              <div class="flex mt-4 md:mt-6">
                <BaseButton
                  label="Alterar Foto"
                  @click="openModal = true"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </div>
            </div>
          </div>

          <!-- Box 2: Dados de Usuário e Nova Senha -->
          <div class="w-full sm:w-[100%] border border-gray-200 rounded-lg shadow dark:bg-[#2B1511] dark:border-gray-700">
            <!-- Dados do Usuário -->
            <div class="p-6">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dados do Usuário:</h2>
              <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Nome de Usuário:</label>
                  <BaseInput class="p-3 w-full" v-model="user.nome" />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Email:</label>
                  <BaseInput class="p-3 w-full" v-model="user.email" />
                </div>
              </div>

              <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Telefone:</label>
                  <BaseInput class="p-3 w-full" v-model="user.phone" />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Endereço:</label>
                  <BaseInput class="p-3 w-full" v-model="user.address.line1" />
                </div>
              </div>

              <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Cidade:</label>
                  <BaseInput class="p-3 w-full" v-model="user.address.city" />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">País:</label>
                  <BaseInput class="p-3 w-full" v-model="user.address.country" />
                </div>
              </div>

              <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Estado:</label>
                  <BaseInput class="p-3 w-full" v-model="user.address.state" />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">CEP:</label>
                  <BaseInput class="p-3 w-full" v-model="user.address.postal_code" />
                </div>
              </div>

              <div class="flex justify-end gap-4">
                <BaseButton class="bg-gray-800 text-white" label="Editar" />
                <BaseButton label="Salvar" @click="handleUpdate" />
              </div>
            </div>
          </div>
        </div>

        <!-- Segunda linha com 2 boxes -->
        <div class="flex flex-col sm:flex-row gap-8 justify-center w-full sm:w-[100%] mt-8">
          <!-- Box 1: Alterar Senha -->
          <div class="w-full sm:w-[50%] max-w-xl bg-[#2B1511] border border-gray-200 rounded-lg shadow dark:bg-[#2B1511] dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Alterar Senha:</h2>
              <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Senha Atual:</label>
                  <BaseInput class="p-3 w-full" type="password" v-model="actualPassword" />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Nova Senha:</label>
                  <BaseInput class="p-3 w-full" type="password" v-model="newPassword" />
                </div>
              </div>
              <div class="flex justify-end">
                <BaseButton label="Mudar Senha" @click="handleUpdatePassword" :disabled="!newPassword || !actualPassword" />
              </div>
            </div>
          </div>

          <!-- Box 2: Outro Box -->
          <div class="w-full sm:w-[50%] max-w-xl bg-[#2B1511] border border-gray-200 rounded-lg shadow dark:bg-[#2B1511] dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Outra Seção:</h2>
              <!-- Conteúdo do segundo box aqui -->
              <p class="text-white">Este é o segundo box da segunda linha. Você pode personalizar o conteúdo conforme necessário.</p>
            </div>
          </div>
        </div>
      <!-- Modal e Alertas -->
      </div>
      
      <!-- Modal e Alertas -->
      <UserImageModal
        :open="openModal"
        @update:open="cancel($event)"
        @update:refresh="refreshList($event)"
        :info="user"
      />
      
      <BaseAlertError v-if="error" class="alert" :text="textError" />
      <BaseAlertSuccess v-if="success" class="alert" :text="textSuccess" />
    </div>
    <div v-else class="loading">
        <BaseLoading class="loading-icon" />
      </div>
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

.page-background {
  margin-top: 20px;
}

.flex-1 {
  color: rgb(43, 43, 43);
}

span {
  color: white;
}

label {
  color: white;
}
</style>




