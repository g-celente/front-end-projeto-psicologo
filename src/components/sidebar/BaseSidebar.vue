<script>
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from 'vue-router'; // Importa o roteador se ainda não estiver
import { ref } from 'vue'; // Adiciona o ref para controlar a função dentro do setup

export default {
    name: "Sidebar",
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        const handleLogout = async () => {
            try {
                await authStore.userLogout();
                localStorage.removeItem("token-auth");
                router.push('/');
            } catch (error) {
                console.log(error);
            }
        };

        return {
            handleLogout
        };
    },
};
</script>


<template>
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div class="h-full flex flex-col px-3 pb-4 bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li>
            <router-link to="/about">
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path
                    d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                  />
                  <path
                    d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                  />
                </svg>
                <span class="ms-3">Chat Ao Vivo</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/perfil">
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
                  />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Perfil</span>
              </a>
            </router-link>
          </li>
        </ul>
  
        <!-- Botão de Logout, posicionado no fim da sidebar -->
        <div class="mt-auto">
            <button
              @click="handleLogout"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
              <span class="ms-3">Logout</span>
            </button>
        </div>
      </div>
    </aside>
</template>

  