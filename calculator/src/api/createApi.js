function createApi(endpoint) {
  let proxy = "https://cors-anywhere.herokuapp.com/";

  let api = {
    url: `${proxy}${endpoint}`,
    options: {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        "content-type": "application/json"
      }
    }
  };

  return api;
}

export default createApi;
