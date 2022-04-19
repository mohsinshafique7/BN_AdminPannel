import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { requestsPromiseMiddleware } from "redux-saga-requests";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { signOutMiddleware } from "../middlewares/log-out";

import rootReducer from "./rootReducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  requestsPromiseMiddleware(),
  thunk,
  // createLogger(),
  signOutMiddleware,
];

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
