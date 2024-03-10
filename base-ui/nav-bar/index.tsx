import React, { memo, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Search from "../search";
//type
import type { FC } from "react";
import type { ISearchSuggest } from "@/service/home";
import styles from "./index.module.scss";

interface IProps {
  navbar?: ISearchSuggest;
}

const NavBar: FC<IProps> = (props) => {
  const { navbar } = props;

  // 在客户端获取数据
  useEffect(() => {
    console.log("fetch data on client");
  }, []);

  const [newNavBar, setNewNavBar] = useState(navbar);
  useEffect(() => {
    // console.log("navbar=>", navbar);
    if (navbar?.configKey && navbar?.configKey.length) {
      localStorage.setItem("navbar", JSON.stringify(navbar));
    } else {
      const localNavbar = localStorage.getItem("navbar") || "{}";
      setNewNavBar(JSON.parse(localNavbar));
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={classNames("wrapper", styles.content)}>
        <div className={styles["content-left"]}>
          <Link href="/" className={styles.logo}></Link>
          <h1 className={styles.title}>网易云音乐上次</h1>
        </div>

        <div className={styles["content-right"]}>
          <Search searchData={newNavBar}></Search>

          <div className={styles["right-cart"]}>
            <a href="#" className={styles.cart}>
              <span className={styles.count}>0</span>
            </a>
          </div>
          <div className={styles["right-login"]}>登录</div>
        </div>
      </div>
    </div>
  );
};

export default memo(NavBar);
NavBar.displayName = "NavBar";
