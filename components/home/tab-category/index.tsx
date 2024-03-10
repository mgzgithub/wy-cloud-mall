import { memo } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
//type
import type { FC } from "react";
import styles from "./index.module.scss";

interface IProps {
  tabs?: any[];
}

const TabCategory: FC<IProps> = (props) => {
  const { tabs } = props;
  const router = useRouter();

  // 不利于SEO( 但是更加灵活 )
  function handleItemClick(item: any) {
    if (item.tabIndex === 0 || item.tabIndex === 1) {
      // IP周边 -  数码影响
      router.push({
        pathname: "/search",
        query: {
          q: item.title,
        },
      });
    } else if (item.tabIndex === 2) {
      // 热销爆品
      router.push({
        pathname: "/detail",
        query: {
          id: item.cid,
          title: item.title,
        },
      });
    } else {
      // 云倍商城
      window.open(item.targetUrl);
    }
  }

  function getRouterInfo(item: any) {
    if (item.tabIndex === 0 || item.tabIndex === 1) {
      // IP周边 -  数码影响
      return {
        pathname: "/search",
        query: {
          q: item.title,
        },
      };
    } else if (item.tabIndex === 2) {
      // 热销爆品
      return {
        pathname: "/detail",
        query: {
          id: item.cid,
        },
      };
    } else {
      // 云倍商城
      if (process.env.client) {
        window.document.open(item.targetUrl);
      }
      return {};
    }
  }
  return (
    <div className={styles["tab-category"]}>
      <div className={classNames("wrapper", styles.content)}>
        <Row>
          {tabs?.map((item) => {
            return (
              <Col span={6} key={item.cid}>
                {/* span: 栅格占位6格数,all屏幕 */}
                <div
                  className={styles["category-item"]}
                  onClick={() => handleItemClick(item)}
                >
                  <Image
                    className={styles.image}
                    src={item.picStr}
                    width={48}
                    height={48}
                    alt="hy next"
                  ></Image>
                  <div className={styles.right}>
                    <div className={styles.title}>{item.title}</div>
                    {item.type === 1 && (
                      <div className={styles["sub-title"]}>
                        <span className={styles.count}>{item.count}</span>
                        <span>{item.desc}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default memo(TabCategory);
TabCategory.displayName = "TabCategory";
