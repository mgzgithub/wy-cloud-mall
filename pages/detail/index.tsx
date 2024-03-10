import { memo } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { getProductDetailData } from "@/service/detail";

//type
import type { FC } from "react";
import styles from "./index.module.scss";
import type { GetServerSideProps } from "next";
import type { IDetailProduct } from "@/service/detail";
import GridView from "@/base-ui/grid-view";
interface IProps {
  detailData?: IDetailProduct;
}

// 触发时机：无论刷新浏览器器，函数路由切换都会执行
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  console.log("detail1 id", id);
  let props: IProps = {};
  if (typeof id === "string") {
    const res = await getProductDetailData(id); // 第一次先把数据传递给app，然后在传递给页面组件
    // console.log(res.data);
    props.detailData = res.data;
  }
  return {
    props: props,
  };
};

const Detail: FC<IProps> = (props) => {
  const { detailData = {} as IDetailProduct } = props;
  // console.log("detail2 react", detailData);
  return (
    <div className={styles.detail}>
      <div className={classNames("wrapper", styles["content"])}>
        <div className={styles.banner}>
          <Link href={"/"}>
            <Image src={detailData.webPic} alt="next" priority fill></Image>
          </Link>
          {/* <Image src={detailData!.webPic} alt="next" priority fill></Image> */}
        </div>

        <GridView products={detailData?.products}></GridView>
      </div>
    </div>
  );
};

export default memo(Detail);
Detail.displayName = "Detail";
