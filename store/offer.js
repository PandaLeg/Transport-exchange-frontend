import authHeader from '../service/auth-header'

const API_URL = 'http://localhost:9090/cargo/';

export const state = () => ({
  allCargo: {},
  listPointsAllCargo: []
});

export const mutations = {
  setAllCargo(state, data) {
    state.allCargo = data;
  },

  setPointsAllCargo(state, data) {
    state.listPointsAllCargo = data;
  },
};

export const actions = {
  async getAllOfferCargoAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_URL + 'get-all-offer-cargo/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    console.log("CARGO", data);
    if (data) {
      commit('setAllCargo', data.cargo);
      commit('setPointsAllCargo', data.pointsLUCargo);
    }
  },
};

export const getters = {
  getAllOfferCargo: state => {
    return state.allCargo
  },

  getPointsAllCargo: state => {
    return state.listPointsAllCargo
  },
};
