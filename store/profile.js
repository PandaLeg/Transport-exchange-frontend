import authHeader from '../service/auth-header'

const API_CARGO = 'http://localhost:9090/cargo/';
const API_TRANSPORT = 'http://localhost:9090/transport/';
const API_USER = 'http://localhost:9090/user/';

export const state = () => ({
  countCargo: 0,
  countTransports: 0,
  countComplete: 0,
  countNotComplete: 0,
  user: {}
});

export const mutations = {
  setUserMutation(state, user) {
    state.user = user;
  },

  setCountCargoMutations(state, count) {
    state.countCargo = count;
  },

  setCountTransportsMutations(state, count) {
    state.countTransports = count;
  },

  setCountCargoCompleteMutations(state, count) {
    state.countComplete = count;
  },

  setCountCargoNotCompleteMutations(state, count) {
    state.countNotComplete = count;
  },

  clearCountCargo(state) {
    state.countCargo = 0;
  },

  clearCountTransports(state) {
    state.countTransports = 0;
  }
};

export const actions = {
  async getCountCargoAction({commit}, body) {
    const response = await this.$axios.get(API_CARGO + 'get-count-cargo/' + body.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {id: body.id}
      });
    const data = await response.data;

    console.log(data);
    if (data) {
      commit('setUserMutation', data.user);
      commit('setCountCargoMutations', data.count);
    }
  },

  async getCountTransportAction({commit}, body) {
    const response = await this.$axios.get(API_TRANSPORT + 'get-count-transports/' + body.id,
      {
        headers: Object.assign(authHeader(body.store))
      });
    const data = await response.data;

    if (data) {
      commit('setCountTransportsMutations', data);
    }
  },


  async getCountCompleteAction({commit}, body) {
    const response = await this.$axios.get(API_CARGO + 'get-count-cargo-complete/' + body.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {id: body.id, userId: body.user.id}
      });
    const data = await response.data;

    console.log("COUNT COMPLETE", data);
    if (data) {
      commit('setCountCargoCompleteMutations', data.countComplete);
      commit('setCountCargoNotCompleteMutations', data.countNotComplete);
    }
  },

  async sendConfirmationAction({commit}, body) {
    const response = await this.$axios.post(API_USER + 'send-confirmation/' + body.id, body.confirmation,
      {
        headers: Object.assign(authHeader(body.store))
      });
    const data = await response.data;

    console.log(data);
  }
};

export const getters = {
  getUserProfile: state => {
    return state.user
  },

  getCountCargo: state => {
    return state.countCargo
  },

  getCountTransports: state => {
    return state.countTransports
  },

  getCountCargoComplete: state => {
    return state.countComplete
  },

  getCountCargoNotComplete: state => {
    return state.countNotComplete
  }
};
