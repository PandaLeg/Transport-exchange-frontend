import authHeader from '../service/auth-header'

const API_CARGO = 'http://localhost:9090/cargo/';
const API_TRANSPORT = 'http://localhost:9090/transport/';

export const state = () => ({
  countCargo: 0,
  countTransports: 0
});

export const mutations = {
  setCountCargoMutations(state, count) {
    state.countCargo = count;
  },

  setCountTransportsMutations(state, count) {
    state.countTransports = count;
  },

  clearCountCargo(state){
    state.countCargo = 0;
  },

  clearCountTransports(state){
    state.countTransports = 0;
  }
};

export const actions = {
  async getCountCargoAction({commit}, body) {
    let checkUserRole = body.user.roles.includes('ROLE_USER');

    const response = await this.$axios.get(API_CARGO + 'get-count-cargo/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    console.log(data);
    if (data) {
      commit('setCountCargoMutations', data);
    }
  },

  async getCountTransportAction({commit}, body) {
    let checkUserRole = body.user.roles.includes('ROLE_USER');

    const response = await this.$axios.get(API_TRANSPORT + 'get-count-transports/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    if (data) {
      commit('setCountTransportsMutations', data);
    }
  }
};

export const getters = {
  getCountCargo: state => {
    return state.countCargo
  },

  getCountTransports: state => {
    return state.countTransports
  }
};
