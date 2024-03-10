import { memo } from "react";
import TopSwiper from "@/base-ui/top-swiper";

// type
import type { FC } from "react";
import { GetServerSideProps } from "next";

import styles from "./index.module.scss";
import {
  getHomeInfoData,
  getHotProductV2Data,
  getAllProductData,
} from "@/service/home";
import { wrapper } from "@/store/index";
import TabCategory from "@/components/home/tab-category";
import Recommend from "@/components/home/recommend";
import SectionTitle from "@/base-ui/section-title";
import GridView from "@/base-ui/grid-view";
import classNames from "classnames";
import DigitalPanel from "@/components/home/digital-panel";
import { fetchHomeInfoDataAction } from "@/store/modules/home";

interface IProps {
  banners: Array<any>;
  tabs?: any[];
  recommends?: any[];
  digitalData?: any;

  hotProducts: Array<any>;
  allProducts: Array<any>;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // 1.服务器端发起网络请求不会出现跨域问题
      // 需要将数据存储到redux中
      await store.dispatch(fetchHomeInfoDataAction({}));

      const homeInfoData = await getHomeInfoData();
      const hotProductV2Data = await getHotProductV2Data();
      const allProductData = await getAllProductData();

      const result: IProps = {
        banners: homeInfoData.data.banners || [],
        tabs: homeInfoData.data.categorys || [],
        recommends: homeInfoData.data.recommends || [],
        digitalData: homeInfoData.data.digitalData || [],

        hotProducts: hotProductV2Data.data.hotProduct || [],
        allProducts: allProductData.data.allProduct || [],
      };
      return {
        props: result,
      };
    };
  });
const Home: FC<IProps> = (props) => {
  const { banners, hotProducts, allProducts, tabs, recommends, digitalData } =
    props;

  return (
    <div className={styles.home}>
      <TopSwiper banners={banners}></TopSwiper>
      <TabCategory tabs={tabs}></TabCategory>
      <Recommend recommends={recommends}></Recommend>

      <div className={classNames("wrapper", styles.content)}>
        <SectionTitle title="编辑推荐"></SectionTitle>
        <GridView products={hotProducts}></GridView>
        <DigitalPanel itemData={digitalData}></DigitalPanel>
        <SectionTitle title="热门商品"></SectionTitle>
        <GridView products={allProducts}></GridView>
      </div>
    </div>
  );
};

export default memo(Home);
Home.displayName = "Home";
