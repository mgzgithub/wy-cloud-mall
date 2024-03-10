import Layout from "@/base-ui/layout";
import { Provider } from "react-redux";
import { wrapper } from "@/store/index";
// type
import type { AppProps } from "next/app";

// 全局样式
import "normalize.css";
import "antd/dist/antd.css";
import "@/styles/globals.scss";
// import { useRouter } from "next/router";

// 每次点击刷新浏览器器会执行，如果是在前端路由导航不会触发执行
export default function App({ Component, ...rest }: AppProps) {
  // console.log("app props 执行了");

  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
