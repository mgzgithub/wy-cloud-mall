import { memo, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Col, Row } from "antd";
//type
import type { FC } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
// import axios from "axios";
interface IProps {
  recommends?: any[];
}

const Recommend: FC<IProps> = (props) => {
  const { recommends = [] } = props;

  return (
    <div className={styles.recommend}>
      <div className={classNames("wrapper", styles.content)}>
        <Row>
          {recommends.map((item) => {
            return (
              <Col span={12} key={item.id}>
                <Link href={`/detail?id=${item.id}`}>
                  <div className={"recommend-item"}>
                    {/* priority 启用预加载 */}
                    <Image
                      className={styles.image}
                      src={item.picStr}
                      width={542}
                      priority
                      height={300}
                      alt="hy next"
                    ></Image>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default memo(Recommend);
Recommend.displayName = "Recommend";
