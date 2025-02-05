<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from 'vue-router'; 


// Criando o store
const usersStore = userStore();
const { userPerfil } = usersStore;
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const user = ref(null);  
const isSidebarOpen = ref(false)


const handleLogout = async () => {
  try {
    localStorage.removeItem("token-auth")
    router.push("/")
  } catch (error) {
    console.log(error)
  }
}

const initFunction = async () => {
  loading.value = true;
  user.value = await userPerfil();
  loading.value = false;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="fixed top-0 z-50 w-full bg-[#2B1511] border-b border-[#2B1511] dark:[#2B1511] dark:border-[#2B1511]">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <img v-if="user" src="" class="h-8 me-3" alt="" />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Freud Psicólogo</span>
          </div>
          <router-link to="perfil">
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <span class="sr-only">Open user menu</span>
                    <img v-if="user" class="w-8 h-8 rounded-full" :src="user.user_img" alt="user photo">
                  </button>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </nav>
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform bg-[#2B1511] border-r border-gray-200 sm:translate-x-0 dark:bg-[#2B1511] dark:border-gray-700"
      aria-label="Sidebar"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
    <div class="h-full flex flex-col px-3 pb-4 bg-[#2B1511] dark:bg-[#2B1511]">
      <ul class="space-y-2 font-medium">
        <li>
            <router-link to="/home">
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3l8 8-1.5 1.5L12 5.5 5.5 12.5 4 11l8-8z" />
                  <path d="M5 13h14v8H5v-8z" />
                </svg>
                <span class="ms-3">Home</span>
              </a>
            </router-link>
        </li>
        <!-- Botão de Chat Ao Vivo -->
        <li>
            <router-link to="/chat">
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4v-4h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                <span class="ms-3">Converse Com Freud</span>
              </a>
            </router-link>
        </li>
        
        <!-- Botão de Perfil -->
        <li>
            <router-link to="/perfil">
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5 5zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" />
                </svg>
                <span class="ms-3">Perfil</span>
              </a>
            </router-link>
        </li>
        <li>
          <button
          @click="handleLogout"
          class="flex items-center p-2 bg-[#2B1511] rounded-lg dark:text-white dark:hover:bg-[#2B1511] group w-100%"
        >
          <svg
            class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h7a1 1 0 110 2H4v10h7a1 1 0 110 2H4a1 1 0 01-1-1V4zm10.707 5.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L12 11.414V14a1 1 0 102 0v-5a1 1 0 00-1-1h-5a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 000 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="ms-3">Sair</span>
        </button>
        </li>
      </ul>

      <!-- Botão de Logout -->
      <div class="mt-auto flex flex-col items-center justify-center">
        <!-- Logo e texto centralizado -->
        <div class="mt-5 flex flex-col items-center">
          <img src="../../assets/img/logo freud.png" alt="" class="w-24 h-24 mb-3" />
          <span class="text-center text-gray-500">Logo Freud</span>
        </div>
      </div>
    </div>
  </aside>
  </div>
</template>

<style scoped>
  /* Additional styles if necessary */
</style>
