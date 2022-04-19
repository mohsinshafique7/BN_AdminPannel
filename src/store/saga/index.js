import axios from 'axios';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('Token')
  config.headers.Authorization =  token

  return config
})

export default function* rootSaga() {
  yield createRequestInstance({ driver: createDriver(axios) });
  yield watchRequests();
}