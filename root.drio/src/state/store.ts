import { rootApi } from "./services/apiService";
import storage from "redux-persist/lib/storage";

import {
  PreloadedState,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";

import { setupListeners } from "@reduxjs/toolkit/query";
import storageSession from "redux-persist/lib/storage/session";

import uiReducer from "./slices/uiSlice";
import DDXReducer from "./slices/DDXSlice";
import authReducer from "./slices/authSlice";
import alertsReducer from "./slices/alertsSlice";
import orgUnitReducer from "./slices/orgUnitSlice";
import datasetReducer from "./slices/datasetSlice";
import metadataReducer from "./slices/metadataSlice";
import policiesReducer from "./slices/policiesSlice";
import anomaliesReducer from "./slices/anomaliesSlice";
import auditLogsReducer from "./slices/auditLogsSlice";
import dataSourceReducer from "./slices/dataSourceSlice";
import DDXInstanceReducer from "./slices/DDXInstanceSlice";
import inboundContractReducer from "./slices/inboundContractSlice";
import outboundContractReducer from "./slices/outboundContractSlice";
import approvedContractReducer from "./slices/approvedContractSlice";
import subscribeDatasetReducer from "./slices/subscribeDatasetsSlice";
import alertsAnomalyPoliciesReducer from "./slices/alertAnomalyPoliciesSlice";

const persistAuthConfig = {
  key: "auth",
  storage: storage,
};

const persistDDXConfig = {
  key: "ddx",
  storage: storageSession,
};

const persistedDDXReducer = persistReducer(persistDDXConfig, DDXReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

// export const store = configureStore({
//   reducer: {
//     ui: uiReducer,
//     DDX: DDXReducer,
//     alerts: alertsReducer,
//     orgUnit: orgUnitReducer,
//     dataset: datasetReducer,
//     metadata: metadataReducer,
//     policies: policiesReducer,
//     auth: persistedAuthReducer,
//     anomalies: anomaliesReducer,
//     auditLogs: auditLogsReducer,
//     dataSource: dataSourceReducer,
//     inboundContract: inboundContractReducer,
//     outboundContract: outboundContractReducer,
//     approvedContract: approvedContractReducer,
//     subscribeDataset: subscribeDatasetReducer,
//     [rootApi.reducerPath]: rootApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(rootApi.middleware),
// });

const rootReducer = combineReducers({
  ui: uiReducer,
  DDX: persistedDDXReducer,
  alerts: alertsReducer,
  orgUnit: orgUnitReducer,
  dataset: datasetReducer,
  metadata: metadataReducer,
  policies: policiesReducer,
  auth: persistedAuthReducer,
  anomalies: anomaliesReducer,
  auditLogs: auditLogsReducer,
  dataSource: dataSourceReducer,
  DDXInstance: DDXInstanceReducer,
  inboundContract: inboundContractReducer,
  outboundContract: outboundContractReducer,
  approvedContract: approvedContractReducer,
  subscribeDataset: subscribeDatasetReducer,
  alertsAnomalyPolicies: alertsAnomalyPoliciesReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
      return defaultMiddleware.concat(rootApi.middleware);
    },
  });

export const store = setupStore();

setupListeners(store.dispatch);

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type ApplicationState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
