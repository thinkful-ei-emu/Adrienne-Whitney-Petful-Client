import config from '../config';

const petServices = {
  getPet(petType) {
    return fetch(`${config.API_ENDPOINT}/${petType}`, {
      method: "GET"
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },

  deletePet(id) {
    return fetch(`${config.API_ENDPOINT}/${petType}`, {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!  Please try again.');
      }
    });
  }
}

export default petServices;