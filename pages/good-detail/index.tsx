import { memo } from "react";
import classNames from "classnames";

//type
import type { FC } from "react";
import styles from "./index.module.scss";
import BreadCrumb from "@/base-ui/bread-crumb";
import { GetServerSideProps } from "next";
import { getProductDetailData } from "@/service/detail";
import { getProductSearchData } from "@/service/search";
interface IProps {
  links?: any[];
}
interface IProps {
  products?: any[];
  q?: string;
}

// 触发时机：无论刷新浏览器器，函数路由切换都会执行
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  console.log("detail q", q);
  let props: IProps = {};

  return {
    props: props,
  };
};

const GoodDetail: FC<IProps> = (props) => {
  const { q } = props;

  const links = [
    {
      name: "首页",
      link: "/",
      id: 10413,
    },
    {
      // name: "耳机",
      name: q,
      link: null,
      id: 10414,
    },
  ];
  return (
    <div className={styles["good-detail"]}>
      <div className={classNames("wrapper", styles.content)}>
        <BreadCrumb links={links}></BreadCrumb>
      </div>
    </div>
  );
};

export default memo(GoodDetail);
GoodDetail.displayName = "GoodDetail";
