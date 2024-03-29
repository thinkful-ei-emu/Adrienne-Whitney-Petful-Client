import config from '../config';

const petServices = {
  getPet(petType) {
    return fetch(`${config.API_ENDPOINT}/${petType}`, {
      method: "GET"
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },

  deletePet(petType) {
    return fetch(`${config.API_ENDPOINT}/${petType}`, {
      method: "DELETE",
      body: JSON.stringify({
        // this will need to be changed probably
        petType
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!  Please try again.');
      }
    });
  }
}

export default petServices;