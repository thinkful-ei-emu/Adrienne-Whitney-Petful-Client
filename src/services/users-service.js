import config from '../config';
const usersService = {

  // get users queue
  getUsers() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "GET"
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },

  postUser(name) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify({
        name
      })
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },

  deleteUser(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong!  Please try again.");
      }
    });
  }
}

export default usersService;