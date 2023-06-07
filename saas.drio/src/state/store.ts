import { rootApi } from "./services/apiService";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import uiReducer from "./slices/uiSlice";
import DDXSlice from "./slices/DDXSlice";
import authReducer from "./slices/authSlice";
import licensingReducer from "./slices/licensingSlice";
import adminAccountReducer from "./slices/adminAccountSlice";
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
    DDX: DDXSlice,
    ui: persistedUIReducer,
    auth: persistedAuthReducer,
    licensing: licensingReducer,
    adminAccount: adminAccountReducer,
    adminOrgAccount: adminOrgAccountReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
