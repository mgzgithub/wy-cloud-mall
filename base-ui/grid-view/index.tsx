import { memo, useEffect } from "react";
import classNames from "classnames";

//type
import type { FC } from "react";
import styles from "./index.module.scss";
import { Row, Col } from "antd";
import GridViewItem from "../grid-view-item";
import { useRouter } from "next/router";
import axios from "axios";
interface IProps {
  products?: any[];
}

const GridView: FC<IProps> = (props) => {
  const { products = [] } = props;
  const router = useRouter();
  function handleItemClick(product: any) {
    // console.log(product);
    router.push({
      pathname: "/good-detail",
      query: {
        q: product.name,
        id: product.id,
      },
    });
  }
  // 1100 + 16 = 1116px
  return (
    <div className={styles["grid-view"]}>
      <Row>
        {products.map((item, index) => {
          return (
            <Col span={6} key={item.id}>
              <div className={styles["view-item"]}>
                <GridViewItem
                  onItemClick={handleItemClick}
                  showTip={index === 0}
                  product={item}
                ></GridViewItem>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default memo(GridView);
GridView.displayName = "GridView";
