import { rootApi } from "./services/apiService";

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import uiReducer from "./slices/uiSlice";
import DDXReducer from "./slices/DDXSlice";
import authReducer from "./slices/authSlice";
import datasetReducer from "./slices/datasetSlice";
import dataSourceReducer from "./slices/dataSourceSlice";
import dataContractReducer from "./slices/dataContractSlice";
import adminOrgAccountReducer from "./slices/adminOrgAccountSlice";

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
    dataset: datasetReducer,
    auth: persistedAuthReducer,
    dataSource: dataSourceReducer,
    dataContract: dataContractReducer,
    adminOrgAccount: adminOrgAccountReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
