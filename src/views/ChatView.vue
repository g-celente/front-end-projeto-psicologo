<script setup>
import { ref, onMounted } from "vue";
import { conversationStore } from "@/stores/conversation";

const conversation = conversationStore()

// Criação de referências reativas para armazenar as mensagens e a nova mensagem
const messages = ref([]);
const newMessage = ref("");

// Função para buscar mensagens iniciais (simulando uma chamada API)
const getMessages = async () => {
  
  try {
    const response = await conversation.getMessages()

    console.log(response)

    return response
  } catch (error) {
    console.log(error)
  }

};

// Função para inicializar a conversa e popular o array reativo de mensagens
const initFunction = async () => {
  messages.value = await getMessages(); // Adiciona as mensagens ao array reativo
};

// Função para enviar a mensagem
const sendMessage = async () => {
  if (newMessage.value.trim() === "") return; // Verifica se a mensagem não está vazia

  // Adiciona a mensagem ao array de mensagens localmente antes de enviar
  messages.value.push({
    id: Date.now(), // Gera um ID temporário
    content: newMessage.value,
    role: "user", // Define o papel do usuário
  });

  const userMessage = ref({
    message: newMessage.value,
  }) // Armazena a mensagem do usuário
  newMessage.value = ""; // Limpa o campo de input imediatamente

  try {
    const response = await conversation.sendMessage(userMessage.value); // Envia a mensagem ao servidor

    // Adiciona a resposta ao array de mensagens
    messages.value.push({
      id: Date.now() + 1, // Gera um novo ID para a mensagem de resposta
      content: response, // Substitua pelo campo correto da resposta
      role: "assistant", // Define o papel do assistente
    });
  } catch (error) {
    console.log(error);
  }
};


// Chama a função de inicialização quando o componente for montado
onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="chat">
      <div class="chat-title">
        <h1>Freud Psicólogo</h1>
      </div>
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="w-full flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
          
          <!-- Mensagem do usuário (direita) -->
          <div v-if="message.role === 'user'" class="flex justify-end gap-3 w-full ml-auto w-full p-6">
            <div class="flex-messages flex-col w-full max-w-[350px] leading-1.5 p-5 border border-gray-300 bg-[#2B1511] text-gray-200 rounded-2xl break-words whitespace-pre-wrap">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-semibold">Você</span> <!-- Afastando mais da borda -->
                <span class="text-sm font-normal text-gray-200">11:46</span> <!-- Afastando mais da borda -->
              </div>
              <span class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ message.content }}</span> <!-- Afastando mais do texto -->
            </div>
            <img class="w-10 h-10 rounded-full " src="../assets/img/logo freud.png" alt="User image"> <!-- Afastando da borda com margin-left -->
          </div>
          <!-- Mensagem do assistente (esquerda) -->
          <div v-if="message.role === 'assistant'" class="flex items-start gap-3 w-full">
            <img class="w-10 h-10 rounded-full" src="../assets/img/logo freud.png" alt="Assistant image">
            <div class="flex-messages flex-col w-full max-w-[350px] leading-1.5 p-5 border border-gray-300 bg-[#D2AC67] text-gray-950 rounded-2xl break-words whitespace-pre-wrap">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">Freud Psicólogo</span>
                <span class="text-sm font-normal text-gray-800 dark:text-gray-800">11:46</span>
              </div>
              <span class="text-sm font-normal py-2.5">{{ message.content }}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="message-box"> 
        <label for="chat" class="sr-only">Sua mensagem</label>
        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 w-[80%]">
          <textarea 
            id="chat"
            v-model="newMessage" 
            rows="1" 
            class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Digite sua mensagem..."
          ></textarea>
          <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20" @click="sendMessage">
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span class="sr-only">Enviar mensagem</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

@media (max-width: 630px) {
  .chat {
    width: 100%;
    height: 100%;/* Ajusta o padding para dar mais espaço */
  }

  .message-input {
    width: 90%; /* Aumenta a largura da caixa de entrada em dispositivos móveis */
    padding: 12px;
    font-size: 16px;  /* Ajusta o tamanho da fonte */
  }

  .message-submit {
    width: 30%; /* Garante que o botão de envio ocupe toda a largura */
    padding: 10px;
    font-size: 16px;
    margin-top: 10px; /* Espaçamento entre a caixa de texto e o botão */
  }

  .messages {
    flex: 1;
    overflow-y: auto;
  }
  .flex-messages {
    max-width: 200px;
  }
}

.chat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, .6);
  color: white;
  border-radius: 0;
  overflow: hidden;
  background-image: url(../assets/img/Sigmund-Freuds-Life-Lessons-You-Should-Know-Before-You-Get-Old.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 50px;
}


.chat-title {
  flex: 0 1 70px;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 22px;
  font-weight: bold;
  position: fixed;
  z-index: 2;
  width: 100%;
  
}

.chat-title .avatar {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.5);
  position: fixed;
  z-index: 2;
}

.chat-title .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  z-index: 2;
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-top: 90px; /* Ajusta para ficar abaixo da barra de título fixa */
  margin-bottom: 90px; /* Adiciona espaço para a caixa de input de mensagem */
}


.flex-messages {
  padding: 10px;
}

.message-box {
  width: 100%; /* Garante que a message-box ocupe toda a largura do container do chat */ /* Adicione um valor máximo, se necessário, para limitar a largura em telas grandes */
  margin: 0 auto; /* Centraliza a message-box */
  position: fixed; /* Fixa na parte inferior */
  bottom: 0; /* Alinha a message-box no fundo */ /* Garante que a box esteja centralizada */
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 0px 0px 10px 10px; /* Arredonda os cantos superiores */
  z-index: 2;
}

.message-input {
  flex: 1;
  max-width: 80%; /* Limita a largura máxima do campo de texto para evitar que ele ocupe todo o espaço */
  padding: 15px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  margin-right: 10px;
}

.message-submit {
  flex: 0 0 auto;
  padding: 15px 20px;
  font-size: 18px;
  background: #0084ff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}


.message-submit:hover {
  background: #0066cc;
}

@media (max-width: 450px) {
  .flex-messages {
    max-width: 55%; /* Aumente o tamanho das mensagens */
  }

  .chat-title {
    padding: 20px;
  }

  .messages {
    flex: 1;
  }

  .chat {
    padding-left: 15px;
    padding-right: 15px; /* Reduza o padding da lateral para que o chat ocupe quase toda a largura */
  }
}


</style>
