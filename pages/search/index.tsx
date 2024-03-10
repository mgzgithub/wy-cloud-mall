import { memo, useEffect, useState } from "react";
import classNames from "classnames";

//type
import type { FC } from "react";
import styles from "./index.module.scss";
import BreadCrumb from "@/base-ui/bread-crumb";
import TabSelect from "@/base-ui/tab-select";
import { GetServerSideProps } from "next";
import { getProductSearchData } from "@/service/search";
import GridView from "@/base-ui/grid-view";
import { getSearchSuggestData } from "@/service/home";
import { useRouter } from "next/router";
import axios from "axios";
interface IProps {
  navbar?: any;
  products?: any[];
  q?: string;
}

// 触发时机：无论刷新浏览器器，函数路由切换都会执行
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  // console.log("search q", q);
  let props: IProps = {};
  const searchSuggestData = await getSearchSuggestData();
  if (typeof q === "string") {
    const res = await getProductSearchData({
      limit: 60,
      offset: 0,
      key: q,
    }); // 第一次先把数据传递给app，然后在传递给页面组件
    // console.log(res.products);
    props.products = res.products;
    props.q = q;
    props.navbar = searchSuggestData.data;
  }
  return {
    props: props,
  };
};

const Search: FC<IProps> = (props) => {
  const { products = [], q } = props;
  // const router = useRouter();
  // 拷贝一份
  const [newProducts, setNewProducts] = useState<Array<any>>([...products]);
  // 监听数据的变化，刷新数据
  useEffect(() => {
    setNewProducts([...products]);
  }, [products]);

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

  const selectsData = [
    {
      id: 164331,
      sort: "default",
      name: "综合",
    },
    {
      id: 164332,
      sort: "price_asc",
      name: "价格低到高",
    },
    {
      id: 164333,
      sort: "price_desc",
      name: "价格高到低",
    },
  ];

  function handleTabItemClick(item: any) {
    // console.log(item); // {id: 164332, sort: 'price_asc', name: '价格低到高'}

    // 恢复默认
    if (item.sort === "default") {
      setNewProducts([...products]);
      return;
    }
    // 对新的数组进行排序
    newProducts.sort((a, b) => {
      if (item.sort === "price_asc") {
        return a.minPrice - b.minPrice; // 升序
      } else if (item.sort === "price_desc") {
        return b.minPrice - a.minPrice; // 降序
      } else {
        return 0;
      }
    });
    setNewProducts([...newProducts]);
  }

  return (
    <div className={styles.search}>
      <div className={classNames("wrapper")}>
        <BreadCrumb links={links}></BreadCrumb>
        <TabSelect
          selectsData={selectsData}
          onItemClick={handleTabItemClick}
        ></TabSelect>
        <GridView products={newProducts}></GridView>
      </div>
    </div>
  );
};

export default memo(Search);
Search.displayName = "Search";
