import { rootApi } from "./services/apiService";

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
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
import inboundContractReducer from "./slices/inboundContractSlice";
import outboundContractReducer from "./slices/outboundContractSlice";
import approvedContractReducer from "./slices/approvedContractSlice";
import subscribeDatasetReducer from "./slices/subscribeDatasetsSlice";

const persistConfig = {
  key: "auth",
  storage: storageSession,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    DDX: DDXReducer,
    alerts: alertsReducer,
    orgUnit: orgUnitReducer,
    dataset: datasetReducer,
    metadata: metadataReducer,
    policies: policiesReducer,
    auth: persistedAuthReducer,
    anomalies: anomaliesReducer,
    auditLogs: auditLogsReducer,
    dataSource: dataSourceReducer,
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
