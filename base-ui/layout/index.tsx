import { memo, ReactNode, useEffect } from "react";

import type { FC } from "react";
import type { ISearchSuggest } from "@/service/home";
import NavBar from "../nav-bar";
import Footer from "../footer";
import styles from "./index.module.scss";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "@/store/index";
import axios from "axios";
import { useRouter } from "next/router";
interface IProps {
  children?: ReactNode;
  navbar?: ISearchSuggest;
}

const Layout: FC<IProps> = (props) => {
  /** 1.从redux获取的数据 */
  const { navbar } = useSelector(
    (state: AppState) => ({
      navbar: state.home.navbar,
    }),
    shallowEqual
  );

  // 2.从prop中获取的数据
  const { children } = props;

  return (
    <div className={styles.layout}>
      <NavBar navbar={navbar}></NavBar>
      {children}
      <Footer></Footer>
    </div>
  );
};
export default memo(Layout);
Layout.displayName = "Layout";
