export default (httpClient) => ({

    sendMessages: (message) => {
        return httpClient.post('api/sendMessage', message)
    },
    getMessages: () => {
        return httpClient.get('api/getMessage')
    }
})