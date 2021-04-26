import authHeader from '../service/auth-header'

const API_CARGO_URL = 'http://localhost:9090/cargo/';
const API_TRANSPORT_URL = 'http://localhost:9090/transport/';

export const state = () => ({
  allCargo: [],
  listPointsAllCargo: [],
  allSentCargo: [],
  listPointsAllSentCargo: [],
  allActiveCargo: [],
  listPointsAllActiveCargo: [],
  allCargoInProcessing: [],
  listPointsAllCargoInProcessing: [],
  allCargoComplete: [],
  listPointsAllCargoComplete: [],
  transports: [],
  listPointsTransports: [],
  allSentTransports: [],
  listPointsAllSentTransports: [],
  allActiveTransports: [],
  listPointsAllActiveTransports: [],
  transportsInProcessing: [],
  listPointsTransportsInProcessing: [],
  transportsComplete: [],
  listPointsAllTransportsComplete: []
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

  setCargoToProcessing(state, body) {
    let cargoFromArray = state.allActiveCargo.find(item => item.id === body.cargo.id);
    let itemIndex = state.allActiveCargo.indexOf(cargoFromArray);

    state.allActiveCargo.splice(itemIndex, 1);
    state.listPointsAllActiveCargo.splice(itemIndex, 1);

    state.allCargoInProcessing = [
      ...state.allCargoInProcessing,
      Object.assign(body.cargo, {status: body.data.status})
    ];
  },

  setAllCargoToProcessing(state, allCargo) {
    state.allCargoInProcessing = allCargo;
  },

  setPointsAllCargoToProcessing(state, points) {
    state.listPointsAllCargoInProcessing = points;
  },

  setAllCargoComplete(state, allCargo) {
    state.allCargoComplete = allCargo;
  },

  setPointsAllCargoComplete(state, points) {
    state.listPointsAllCargoComplete = points;
  },

  setTransports(state, data) {
    state.transports = data;
  },

  setPointsTransports(state, data) {
    state.listPointsTransports = data;
  },

  setAllSentTransports(state, data) {
    state.allSentTransports = data;
  },

  setPointsAllSentTransports(state, data) {
    state.listPointsAllSentTransports = data;
  },

  setAllActiveTransports(state, data) {
    state.allActiveTransports = data;
  },

  setPointsAllActiveTransports(state, data) {
    state.listPointsAllActiveTransports = data;
  },

  setTransportToProcessing(state, body) {
    let cargoFromArray = state.allActiveTransports.find(item => item.id === body.transport.id);
    let itemIndex = state.allActiveTransports.indexOf(cargoFromArray);

    state.allActiveTransports.splice(itemIndex, 1);
    state.listPointsAllActiveTransports.splice(itemIndex, 1);

    state.transportsInProcessing = [
      ...state.transportsInProcessing,
      Object.assign(body.transport, {status: body.data.status})
    ];
  },
  setTransportsToProcessing(state, transports) {
    state.transportsInProcessing = transports;
  },

  setPointsTransportsToProcessing(state, points) {
    state.listPointsTransportsInProcessing = points;
  },

  setTransportsComplete(state, transports) {
    state.transportsComplete = transports;
  },

  setPointsTransportsComplete(state, points) {
    state.listPointsAllTransportsComplete = points;
  },

  clearOffers(state) {
    state.allCargo = [];
    state.listPointsAllCargo = [];
    state.allSentCargo = [];
    state.listPointsAllSentCargo = [];
    state.allActiveCargo = [];
    state.listPointsAllActiveCargo = [];
  },

  clearOffersTransports(state) {
    state.transports = [];
    state.listPointsTransports = [];
    state.allSentTransports = [];
    state.listPointsAllSentTransports = [];
    state.allActiveTransports = [];
    state.listPointsAllActiveTransports = [];
  }
};

export const actions = {
  async sendCargoOfferAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.post(API_CARGO_URL + 'send-cargo-offer/' + body.id, body.cargoOffer,
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

  async getAllOfferCargoAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_CARGO_URL + 'get-all-offer-cargo/' + body.user.id,
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

  async getActiveAndSentOffersCargoAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_CARGO_URL + 'get-active-sent-offers-cargo/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    console.log("CARGO ACTIVE", data);

    if (data) {
      commit('setAllSentCargo', data.allCargoSend);
      commit('setPointsAllSentCargo', data.pointsLUDispatchedCargo);
      commit('setAllActiveCargo', data.allCargoActive);
      commit('setPointsAllActiveCargo', data.pointsLUActiveCargo);
      commit('setAllCargoToProcessing', data.allCargoInProcessing);
      commit('setPointsAllCargoToProcessing', data.pointsLUInProcessingCargo);
      commit('setAllCargoComplete', data.allCargoComplete);
      commit('setPointsAllCargoComplete', data.pointsLUCompleteCargo);
    }
  },

  async changeStatusCargoAction({commit}, body) {
    const response = await this.$axios.put(API_CARGO_URL + 'change-status-cargo-offer', {},
      {headers: Object.assign(authHeader(body.store)), params: {id: body.cargo.id}});
    const data = await response.data;

    if (data && body.checkChangeStatus) {
      commit('setCargoToProcessing', {data: data, cargo: body.cargo});
    }
  },

  async sendTransportOfferAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.post(API_TRANSPORT_URL + 'send-transport-offer/' + body.id, body.transportOffer,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER', idUser: body.user.id}
      });
    const data = await response.data;

    console.log("TRANSPORT", data);
    if (data) {
      /*commit('setTransports', data.cargo);
      commit('setPointsTransports', data.pointsLUCargo);*/
    }
  },

  async getAllOfferTransportAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_TRANSPORT_URL + 'get-all-offer-transports/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    console.log("TRANSPORT", data);
    if (data) {
      commit('setTransports', data.transports);
      commit('setPointsTransports', data.pointsLUTransports);
    }
  },

  async getActiveAndSentOffersTransportsAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_TRANSPORT_URL + 'get-active-sent-offers-transports/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    console.log("TRANSPORT ACTIVE", data);

    if (data) {
      commit('setAllSentTransports', data.transportsSend);
      commit('setPointsAllSentTransports', data.pointsLUDispatchedTransport);
      commit('setAllActiveTransports', data.transportsActive);
      commit('setPointsAllActiveTransports', data.pointsLUActiveTransport);
      commit('setTransportsToProcessing', data.transportsInProcessing);
      commit('setPointsTransportsToProcessing', data.pointsLUTransportInProcessing);
      commit('setTransportsComplete', data.transportsComplete);
      commit('setPointsTransportsComplete', data.pointsLUTransportComplete);
    }
  },

  async changeStatusTransportAction({commit}, body) {
    const response = await this.$axios.put(API_TRANSPORT_URL + 'change-status-transport-offer', {},
      {headers: Object.assign(authHeader(body.store)), params: {id: body.transport.id}});
    const data = await response.data;

    if (data && body.checkChangeStatus) {
      commit('setTransportToProcessing', {data: data, transport: body.transport});
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

  getAllCargoInProcessing: state => {
    return state.allCargoInProcessing
  },

  getPointsAllCargoInProcessing: state => {
    return state.listPointsAllCargoInProcessing
  },

  getAllCargoComplete: state => {
    return state.allCargoComplete
  },

  getPointsAllCargoComplete: state => {
    return state.listPointsAllCargoComplete
  },

  getAllOfferTransports: state => {
    return state.transports
  },

  getPointsTransports: state => {
    return state.listPointsTransports
  },

  getAllSentTransports: state => {
    return state.allSentTransports
  },

  getPointsAllSentTransports: state => {
    return state.listPointsAllSentTransports
  },

  getAllActiveTransports: state => {
    return state.allActiveTransports
  },

  getPointsAllActiveTransports: state => {
    return state.listPointsAllActiveTransports
  },

  getTransportsInProcessing: state => {
    return state.transportsInProcessing
  },

  getPointsAllTransportsInProcessing: state => {
    return state.listPointsTransportsInProcessing
  },

  getTransportsComplete: state => {
    return state.transportsComplete
  },

  getPointsAllTransportsComplete: state => {
    return state.listPointsAllTransportsComplete
  },
};
