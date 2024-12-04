export default (httpClient) => ({
    userLogin: (data) => {
      return httpClient.post("/login", data);
    },
});