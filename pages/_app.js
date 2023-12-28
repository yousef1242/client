import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import SmallHeader from "@/components/smallHeader/SmallHeader";
import MainHeader from "@/components/mainHeader/MainHeader";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SmallHeader />
      <MainHeader />
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </Provider>
  );
}
