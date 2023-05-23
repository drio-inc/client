import { rootApi } from "./services/apiService";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
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
    ui: persistedUIReducer,
    auth: persistedAuthReducer,
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
