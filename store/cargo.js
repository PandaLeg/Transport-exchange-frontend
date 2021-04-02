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
    state.pageSize = dataForQuery.pageSize;
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

  clearCargoAfterSearch(state) {
    state.cargoAfterSearch = [];
  },

  // Следующие два метода используются для сохранения пути, для возврата со странички заявки груза
  setCookieResultSearch(state, resultSearch) {
    const data = this.$cookies.get('resultCargoDataSearch');
    if (data === null || data === undefined) {
      this.$cookies.set('resultCargoDataSearch', resultSearch, {maxAge: 100000});
    }
  },

  setResultDataSearch(state) {
    const data = this.$cookies.get('resultCargoDataSearch');

    if (data !== null && data !== undefined) {
      state.resultSearch = data;
      state.pathToSearch = '/cargo/search-cargo/search';
      if (data.pageSize === undefined) {
        state.pageSize = 3;
      } else {
        state.pageSize = data.pageSize;
      }
    } else {
      state.pathToSearch = '/cargo/search-cargo';
    }
  },

  setPointsAllCargo(state, data) {
    state.listPointsAllCargo = data;
  },

  setPointsCargo(state, data) {
    state.listPointsCargo = data;
  },

  setPhotosCargo(state, data) {
    state.listPhotoCargo = data;
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
      {headers: authHeader(body.store), params: {page: body.page, pageSize: body.pageSize}});
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

    console.log("CARGO", data);
    if (data) {
      commit('setCargoView', data)
    }
  },

  async getPlacesCargoAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-points-cargo', {params: {id}});
    const data = await response.data;

    console.log(data);
    if (data) {
      commit('setPointsCargo', data);
    }
  },

  async getPhotoCargoAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-photos-cargo/' + id);
    const data = await response.data;

    if (data) {
      commit('setPhotosCargo', data);
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
