import authHeader from '../service/auth-header'

const API_URL = 'http://localhost:9090/cargo/';

export const state = () => ({
  allCargo: {},
  listPointsAllCargo: [],
  allActiveCargo: {},
  listPointsAllActiveCargo: [],
  allSentCargo: {},
  listPointsAllSentCargo: []
});

export const mutations = {
  setAllCargo(state, data) {
    state.allCargo = data;
  },

  setPointsAllCargo(state, data) {
    state.listPointsAllCargo = data;
  },

  setAllSentCargo(state, data) {
    state.allSentCargo = data;
  },

  setPointsAllSentCargo(state, data) {
    state.listPointsAllSentCargo = data;
  },

  setAllActiveCargo(state, data) {
    state.allActiveCargo = data;
  },

  setPointsAllActiveCargo(state, data) {
    state.listPointsAllActiveCargo = data;
  },

  clearOffers(state){
    state.allCargo = {};
    state.listPointsAllCargo = [];
    state.allSentCargo = {};
    state.listPointsAllSentCargo = [];
    state.allActiveCargo = {};
    state.listPointsAllActiveCargo = [];
  }
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

  async sendCargoOfferAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.post(API_URL + 'send-cargo-offer/' + body.id, body.cargoOffer,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER', idUser: body.user.id}
      });
    const data = await response.data;

    console.log("CARGO", data);
    if (data) {
      commit('setAllCargo', data.cargo);
      commit('setPointsAllCargo', data.pointsLUCargo);
    }
  },

  async getActiveAndSentOffersCargoAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_URL + 'get-active-offers-cargo/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    console.log("CARGO ACTIVE", data);

    if (data) {
      commit('setAllSentCargo', data.allCargoSendFrom);
      commit('setPointsAllSentCargo', data.pointsLUCargoFrom);
      commit('setAllActiveCargo', data.allCargoSendBy);
      commit('setPointsAllActiveCargo', data.pointsLUCargoBy);
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

  getAllSentCargo: state => {
    return state.allSentCargo
  },

  getPointsAllSentCargo: state => {
    return state.listPointsAllSentCargo
  },

  getAllActiveCargo: state => {
    return state.allActiveCargo
  },

  getPointsAllActiveCargo: state => {
    return state.listPointsAllActiveCargo
  },
};
