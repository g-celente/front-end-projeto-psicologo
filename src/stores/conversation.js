import api from "@/api";
import { defineStore } from "pinia";


export const conversationStore = defineStore("conversation", () => {

    async function sendMessage(message) {

        try {
            
            const response = await api.conversation.sendMessages(message)

            return response.data

        } catch (error) {
            console.log(error)
        }


    }

    async function getMessages () {
        try {
            
            const response = await api.conversation.getMessages()

            console.log(response)

            return response.data

        } catch (error) {
            console.log(error)
        }
    }

    return {
        sendMessage,
        getMessages
    }
})

