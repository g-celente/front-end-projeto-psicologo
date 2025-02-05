export default (httpClient) => ({
    userPerfil: () => {
      return httpClient.get("/perfil");
    },
    uploadImg: (formData) => {
      return httpClient.post("/uploadImg", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Isso garante que o arquivo seja enviado corretamente
        }
      });
    },
    alterPassword: (data) => {
      return httpClient.post("/alterPassword", data)
    }
});