import authHeader from '../service/auth-header'


const API_URL = 'http://localhost:9090/cargo/';

export const state = () => ({
  initialCargo: {},
  listPlacesCargo: [],
  propertiesCargo: {},
  cargo: [],
  cargoAfterSearch: [],
  dataForSearchCargo: {},
  listPointsAllCargo: [],
  listPointsCargo: [],
  listPhotoCargo: [],
  cargoView: {},
  user: {},
  checkUser: false,
  checkUserFromOffer: false,
  resultSearch: {},
  pathToSearch: '',
  currentPage: 1,
  totalPages: 0,
  pageSize: 3,
  permissions: [],
  listArg: [
    '1', '2', '3', '4', '5',
    '6', '7', '8', '9'
  ],
  listLoadingCar: [
    'Верхняя', 'Задняя', 'Боковая',
    'Со снятием стоек', 'Со снятием поперечин',
    'С полной растентовкой', 'Без ворот'
  ],
  listPermissions: [
    'TIR', 'CMR', 'По декларации', 'Медкнижка', 'T1'
  ],
  typesPayment: ['Сумма', 'Запрос ставки'],
  listCurrency: [
    'EUR', 'USD', 'UAH',
    'BYN', 'RUB', 'KZT',
    'PLN', 'UZS'
  ],
  listCostPer: [
    'км', 'сутки'
  ],
  listFormPayment: [
    'наличными', 'безналичными', 'комбинированная', 'карта', 'электронный платёж'
  ],
  listTimePayment: [
    'на загрузке', 'на выгрузке', 'по оригиналам'
  ],
  countries: []
});

export const mutations = {
  setInitialCargo(state, cargo) {
    state.initialCargo = cargo;
  },

  setPropertiesCargo(state, properties) {
    state.propertiesCargo = properties;
  },

  setPlacesCargo(state, places) {
    state.listPlacesCargo = places;
  },

  addCargoMutation(state, cargo) {
    console.log(cargo);
    state.cargo = [
      ...state.cargo,
      cargo
    ]
  },

  searchCargoMutation(state, cargo) {
    state.cargoAfterSearch = cargo;
    console.log(state.cargoAfterSearch);
  },

  setDataForSearchCargo(state, dataForQuery) {
    state.dataForSearchCargo = dataForQuery.data;
    state.currentPage = dataForQuery.page;
  },

  setCargoView(state, cargoView) {
    state.cargoView = cargoView;
  },

  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },

  setTotalPages(state, totalPages) {
    state.totalPages = totalPages;
  },

  setPageSize(state, pageSize) {
    if (pageSize === undefined) {
      state.pageSize = 3;
    } else {
      state.pageSize = Number(pageSize);
    }
    console.log("RESULT SEARCH PAGE NON UNDEFINED", state.pageSize);
  },

  clearCargoAfterSearch(state) {
    state.cargoAfterSearch = [];
  },

  // Следующие два метода используются для сохранения пути, для возврата со странички заявки груза
  setCookieResultSearch(state, resultSearch) {
    this.$cookies.set('resultCargoDataSearch', resultSearch, {maxAge: 100000});
  },

  setResultDataSearch(state) {
    const data = this.$cookies.get('resultCargoDataSearch');

    if (data !== null && data !== undefined) {
      state.resultSearch = data;
      state.pathToSearch = '/cargo/search-cargo/search';
    } else {
      state.pathToSearch = '/cargo/search-cargo';
    }
  },

  setUserCargo(state, data) {
    state.user = data;
    state.checkUser = state.user.roles.map(item => item.name).includes('ROLE_USER')
  },

  setPointsAllCargo(state, data) {
    state.listPointsAllCargo = data;
  },

  setPointsCargo(state, data) {
    state.listPointsCargo = data;
  },

  setPhotosCargo(state, data) {
    state.listPhotoCargo = data;
  },

  checkUserFromOffer(state, data) {
    console.log("CARGO FROM OFFER", data.idCargo);
    data.cargo.map(item => {
      if (item.id === data.idCargo) {
        state.checkUserFromOffer = true;
      }
    });
    console.log("CHECK USER FROM OFFER", state.checkUserFromOffer);
  },

  setCheckUserFromOffer(state) {
    state.checkUserFromOffer = false;
  }
};

export const actions = {
  async addCargoAction({commit, state}, store) {
    const response = await this.$axios.post(API_URL + 'add-cargo', store.formData,
      {
        headers: Object.assign(authHeader(store.store), {"Content-Type": undefined}),
        params: {lang: 'ru', token: store.userToken}
      });
    const data = await response.data;

    console.log("Cargo Action", data);

    if (data) {
      commit('addCargoMutation', data)
    }
  },

  async searchCargoAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'search-cargo', body.data,
      {
        headers: authHeader(body.store),
        params: {page: body.page, pageSize: body.pageSize}
      });
    const data = await response.data;

    if (data) {
      commit('searchCargoMutation', data.cargo);
      commit('setPointsAllCargo', data.pointsLUCargo);
      commit('setCurrentPage', data.currentPage);
      commit('setTotalPages', data.totalPages);
    }
  },

  async getCargoAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-cargo/' + id);
    const data = await response.data;

    if (data) {
      commit('setCargoView', data.cargo);
      commit('setPointsCargo', data.pointsLUCargo);
      commit('setUserCargo', data.user);
    }
  },

  async getPhotoCargoAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-photos-cargo/' + id);
    const data = await response.data;

    if (data) {
      commit('setPhotosCargo', data);
    }
  },

  async checkUserSentOfferAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_URL + 'get-sent-offers-cargo/' + body.user.id, {
      params: {
        headers: Object.assign(authHeader(body.store)),
        role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'
      }
    });
    const data = await response.data;

    if (data) {
      commit('checkUserFromOffer', {cargo: data, idCargo: body.idCargo});
    }
  }
};

export const getters = {
  listCargo: state => {
    return state.cargo
  },

  getPlacesCargo: state => {
    return state.listPlacesCargo
  },

  listCargoAfterSearch: state => {
    return state.cargoAfterSearch
  },

  getCargoView: state => {
    return state.cargoView
  },

  getUserFromCargo: state => {
    return state.user
  },

  getCheckUserFromOffer: state => {
    return state.checkUserFromOffer
  },

  checkUser: state => {
    return state.checkUser
  },

  getDataResultSearch: state => {
    return state.resultSearch;
  },

  getPathToSearch: state => {
    return state.pathToSearch
  },

  getPointsAllCargo: state => {
    return state.listPointsAllCargo
  },

  getPointsCargo: state => {
    return state.listPointsCargo
  },

  getPhotoCargo: state => {
    return state.listPhotoCargo
  },

  getInitialCargo: state => {
    return state.initialCargo;
  },

  getPropertiesCargo: state => {
    return state.propertiesCargo
  },

  getDataForSearchCargo: state => {
    return state.dataForSearchCargo
  },

  getCurrentPage: state => {
    return state.currentPage
  },

  getTotalPages: state => {
    return state.totalPages
  },

  getPageSize: state => {
    return state.pageSize
  },

  getListArg: state => {
    return state.listArg
  },

  getListLoadingCar: state => {
    return state.listLoadingCar
  },

  getListPermissions: state => {
    return state.listPermissions
  },

  getTypesPayment: state => {
    return state.typesPayment
  },

  getListCurrency: state => {
    return state.listCurrency
  },

  getListCostPer: state => {
    return state.listCostPer
  },

  getListFormPayment: state => {
    return state.listFormPayment
  },

  getListTimePayment: state => {
    return state.listTimePayment
  },

  getCountries: state => {
    return state.countries
  }
};
