export default (httpClient) => ({
    userPerfil: () => {
      return httpClient.get("/perfil");
    },
});