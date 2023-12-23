import "@/styles/globals.css";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "@/comps/ui/Modal";
import Loader from "@/comps/ui/Loader/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Loader />
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
