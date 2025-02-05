<script setup>
import { ref, onMounted } from "vue";

// Criação de referências reativas para armazenar as mensagens e a nova mensagem
const messages = ref([]);
const newMessage = ref("");

// Função para buscar mensagens iniciais (simulando uma chamada API)
const getMessages = async () => {
  return [
    {
      id: 1,
      role: "user",
      content: "Olá Freud",
    },
    {
      id: 2,
      role: "assistant",
      content: "Olá Guilherme",
    }
  ];
};

// Função para inicializar a conversa e popular o array reativo de mensagens
const initFunction = async () => {
  const fetchedMessages = await getMessages();
  messages.value.push(...fetchedMessages); // Adiciona as mensagens ao array reativo
};

// Função para enviar a mensagem
const sendMessage = () => {
  if (newMessage.value.trim() === "") return; // Verifica se a mensagem não está vazia

  // Adiciona a mensagem do usuário ao histórico
  messages.value.push({
    id: messages.value.length + 1,
    role: "user",
    content: newMessage.value,
  });

  // Simulação da resposta do assistente
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      role: "assistant",
      content: "Resposta automática do assistente",
    });
  }, 1000);

  // Limpa o campo de input
  newMessage.value = "";
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
        <div class="avatar">
          <img src="../assets/img/logo freud.png" alt="Avatar" />
        </div>
        <h1>Freud Psicólogo</h1>
      </div>
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="w-full flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
          
          <!-- Mensagem do usuário (direita) -->
          <div v-if="message.role === 'user'" class="flex justify-end gap-3 w-full ml-auto w-full p-6">
            <div class="flex-messages flex-col w-full max-w-[350px] leading-1.5 p-5 border border-gray-300 bg-gray-900 text-gray-200 rounded-2xl break-words whitespace-pre-wrap">
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
            <div class="flex-messages flex-col w-full max-w-[350px] leading-1.5 p-5 border border-gray-300 bg-gray-900 text-gray-200 rounded-2xl break-words whitespace-pre-wrap">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">Freud Psicólogo</span>
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
              </div>
              <span class="text-sm font-normal py-2.5">{{ message.content }}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="message-box">
        <textarea 
          v-model="newMessage" 
          class="message-input" 
          placeholder="Digite sua mensagem..."
        ></textarea>
        <button class="message-submit" @click="sendMessage">Enviar</button>
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
    width: 70%; /* Aumenta a largura da caixa de entrada em dispositivos móveis */
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

  @media (max-width: 450px) {
    .flex-messages {
      max-width: 150px;
    }

    .chat-title {
      padding: 0px;
    }

    .messages {
      flex: 0;
    }

    .chat {
      padding: 1px;
    }
    .message-input {
      width: 65%; /* Aumenta a largura da caixa de entrada em dispositivos móveis */
      padding: 6px;
      font-size: 16px;  /* Ajusta o tamanho da fonte */
    }

    .message-submit {
      width: 35%; /* Garante que o botão de envio ocupe toda a largura */
      padding: 6px;
      font-size: 16px;
      margin-top: 10px; /* Espaçamento entre a caixa de texto e o botão */
    }

    .message-box {
      padding: 5px;
    }
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
  padding: 50px;
  background-image: url(../assets/img/Sigmund-Freuds-Life-Lessons-You-Should-Know-Before-You-Get-Old.jpg);
  background-size: cover;
  background-position: center;
}

.chat-title {
  flex: 0 1 70px;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 22px;
  font-weight: bold;
}

.chat-title .avatar {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.chat-title .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.flex-messages {
  padding: 10px;
}

.message-box {
  flex: 0 1 80px;
  display: flex;
  align-items: center;
  padding: 15px;
  background: rgba(0, 0 , 0, 0.5);
  border-radius: 20px;
}

.message-input {
  flex: 1;
  padding: 15px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.message-submit {
  margin-left: 15px;
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

</style>
