import { rootApi } from "./services/apiService";
import storage from "redux-persist/lib/storage";

import { PreloadedState, configureStore, combineReducers } from "@reduxjs/toolkit";

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
import personaReducer from "./slices/personaSlice";
import orgUnitReducer from "./slices/orgUnitSlice";
import datasetReducer from "./slices/datasetSlice";
import metadataReducer from "./slices/metadataSlice";
import policiesReducer from "./slices/policiesSlice";
import anomaliesReducer from "./slices/anomaliesSlice";
import auditLogsReducer from "./slices/auditLogsSlice";
import dataSourceReducer from "./slices/dataSourceSlice";
import DDXInstanceReducer from "./slices/DDXInstanceSlice";
import alertPoliciesReducer from "./slices/alertPoliciesSlice";
import notificationsBarReducer from "./slices/notificationSlice";
import notificationsPageReducer from "./slices/notificationsSlice";
import inboundContractReducer from "./slices/inboundContractSlice";
import outboundContractReducer from "./slices/outboundContractSlice";
import approvedContractReducer from "./slices/approvedContractSlice";
import datasetMarketplaceReducer from "./slices/datasetMarketplaceSlice";

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

const rootReducer = combineReducers({
  ui: uiReducer,
  DDX: persistedDDXReducer,
  alerts: alertsReducer,
  orgUnit: orgUnitReducer,
  dataset: datasetReducer,
  personas: personaReducer,
  metadata: metadataReducer,
  policies: policiesReducer,
  auth: persistedAuthReducer,
  anomalies: anomaliesReducer,
  auditLogs: auditLogsReducer,
  dataSource: dataSourceReducer,
  DDXInstance: DDXInstanceReducer,
  alertPolicies: alertPoliciesReducer,
  notifications: notificationsBarReducer,
  inboundContract: inboundContractReducer,
  outboundContract: outboundContractReducer,
  approvedContract: approvedContractReducer,
  notificationsPage: notificationsPageReducer,
  datasetMarketplace: datasetMarketplaceReducer,
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
