<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import { ref, watch } from "vue";
import { userStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseModal from "@/components/modal/BaseModal.vue";

const usersStore = userStore();
const { userPerfil, uploadImg } = usersStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const route = useRoute();

const error = ref(false);
const textSuccess = ref("");
const textError = ref("Falha ao alterar foto de perfil!");
const emit = defineEmits(["update:open", "update:refresh"]);

const success = ref(false);

const fileInput = ref(null); // Referência para o input de arquivo

// Função para lidar com o envio do arquivo de imagem
const handlePayload = async () => {
    const formData = new FormData();

    // Adicionando o arquivo ao FormData
    if (fileInput.value.files.length > 0) {
        formData.append("image", fileInput.value.files[0]);
    }

    // Enviar para o backend
    const response = await uploadImg(formData);
    if (response) {
        textSuccess.value = "Foto de Perfil Alterada com Sucesso!!";
        success.value = true; // Armazena a URL da imagem
        emit("update:refresh");
        setTimeout(() => success.value = false, 3000);
    } else {
        textError.value = "Falha ao Alterar Foto de Perfil!!!";
        error.value = true;
        setTimeout(() => error.value = false, 3000);
    }
};

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      // Focus management or other actions when modal opens
    }
  }
);

const handleClose = () => {
  emit("update:open", false);
};
</script>

<template>
  <BaseModal :open="props.open" :closeIcon="true" @update:open="handleClose">
    <template v-slot:header>
      <div class="flex items-center justify-center py-6">
        <h1 class="text-3xl text-center">Alterar Foto</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="mt-4 space-y-4">
        <div class="flex flex-col gap-2">
          <label class="font-semibold">Selecione uma nova imagem</label>
          <input
            ref="fileInput"
            type="file"
            class="input p-3 border rounded-md"
            accept="image/*"
            @change="handlePayload"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-6 flex gap-4 justify-center">
        <BaseButton class="btn text-white bg-gray-500 hover:bg-gray-600" label="Cancelar" @click="handleClose" />
        <BaseButton class="btn text-white bg-blue-500 hover:bg-blue-600" :label="'Salvar'" @click="handlePayload" />
      </div>
    </template>
  </BaseModal>

  <BaseAlertError v-if="error" class="alert absolute top-4 left-1/2 transform -translate-x-1/2 z-50" :text="textError" role="alert"></BaseAlertError>
  <BaseAlertSuccess
    v-if="success"
    class="alert absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
    :text="textSuccess"
    role="alert"
  ></BaseAlertSuccess>
</template>


<style scoped lang="scss">
.input {
  padding: 12px;
}

.btn {
  width: 110px;
}

.alert {
  z-index: 99999 !important;
}
</style>
