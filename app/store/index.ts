import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; //TODO decide for reconciliation later
import AsyncStorage from '@react-native-community/async-storage';

// Imports: Redux Root Reducer
import { rootReducer } from './reducers';

// Imports: Redux Root Saga
import rootSaga from './sagas';

// add the middlewares
const middlewares = [];

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
const middleware = applyMiddleware(...middlewares);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'],
};

//persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(persistedReducer, composeWithDevTools(middleware));
let persistor = persistStore(store);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export { store, persistor };
