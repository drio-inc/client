import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store, persistor } from "@/state/store";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "@/comps/ui/Loader/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Loader />
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
