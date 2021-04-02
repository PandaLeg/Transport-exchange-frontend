export default function authHeader(store) {
  let token = store.state.initialState.token;

  if (token) {
    return {Authorization: 'Bearer ' + token}
  } else {
    return {};
  }
}
