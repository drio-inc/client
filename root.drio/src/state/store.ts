import { rootApi } from "./services/apiService";

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import uiReducer from "./slices/uiSlice";
import DDXReducer from "./slices/DDXSlice";
import authReducer from "./slices/authSlice";
import alertsReducer from "./slices/alertsSlice";
import datasetReducer from "./slices/datasetSlice";
import dataSourceReducer from "./slices/dataSourceSlice";
import adminOrgAccountReducer from "./slices/adminOrgAccountSlice";
import inboundContractReducer from "./slices/inboundContractSlice";
import outboundContractReducer from "./slices/outboundContractSlice";
import approvedContractReducer from "./slices/approvedContractSlice";
import subscribeDatasetReducer from "./slices/subscribeDatasetsSlice";
import anomaliesReducer from "./slices/anomaliesSlice";

const persistConfig = {
  key: "auth",
  storage: storageSession,
};

const persistLocalConfig = {
  key: "ui",
  storage: storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUIReducer = persistReducer(persistLocalConfig, uiReducer);

export const store = configureStore({
  reducer: {
    DDX: DDXReducer,
    ui: uiReducer,
    alerts: alertsReducer,
    dataset: datasetReducer,
    auth: persistedAuthReducer,
    anomalies: anomaliesReducer,
    dataSource: dataSourceReducer,
    adminOrgAccount: adminOrgAccountReducer,
    inboundContract: inboundContractReducer,
    outboundContract: outboundContractReducer,
    approvedContract: approvedContractReducer,
    subscribeDataset: subscribeDatasetReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
