import { aiApi } from "./services/aiService";
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

//Global reducers
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import notificationsReducer from "./slices/notificationSlice";

//Accounts reducers
import orgUnitReducer from "./slices/orgUnitSlice";
import authenticationReducer from "./slices/authenticationSlice";

//Datasets reducers
import datasetReducer from "./slices/datasetSlice";
import dataSourceReducer from "./slices/dataSourceSlice";
import learnedContractReducer from "./slices/learnedContractSlice";
import datasetMarketplaceReducer from "./slices/datasetMarketplaceSlice";

//DDX reducers
import DDXReducer from "./slices/DDXSlice";
import DDXInstanceReducer from "./slices/DDXInstanceSlice";

//Data contracts reducers
import personaReducer from "./slices/personaSlice";
import consumerContractReducer from "./slices/consumerContractSlice";
import subscriptionContractReducer from "./slices/subscriptionContractSlice";
import approvedContractReducer from "./slices/approvedContractSlice";

//Trigger reducers
import contractRuleReducer from "./slices/contractRuleSlice";
import alertPoliciesReducer from "./slices/alertPoliciesSlice";
import triggerActionReducer from "./slices/triggerActionSlice";
import anomalyPoliciesReducer from "./slices/anomalyPoliciesSlice";

//Monitoring reducers
import alertsReducer from "./slices/alertsSlice";
import anomaliesReducer from "./slices/anomaliesSlice";
import auditLogsReducer from "./slices/auditLogsSlice";

import lexiconReducer from "./slices/lexiconSlice";
import settingsReducer from "./slices/settingsSlice";

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
  lexicon: lexiconReducer,
  orgUnit: orgUnitReducer,
  dataset: datasetReducer,
  personas: personaReducer,
  settings: settingsReducer,
  auth: persistedAuthReducer,
  anomalies: anomaliesReducer,
  auditLogs: auditLogsReducer,
  dataSource: dataSourceReducer,
  DDXInstance: DDXInstanceReducer,
  contractRule: contractRuleReducer,
  notifications: notificationsReducer,
  alertPolicies: alertPoliciesReducer,
  triggerAction: triggerActionReducer,
  authentication: authenticationReducer,
  learnedContract: learnedContractReducer,
  anomalyPolicies: anomalyPoliciesReducer,
  consumerContract: consumerContractReducer,
  subscriptionContract: subscriptionContractReducer,
  approvedContract: approvedContractReducer,
  datasetMarketplace: datasetMarketplaceReducer,
  [aiApi.reducerPath]: aiApi.reducer,
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
