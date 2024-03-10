import React, { memo, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Carousel } from "antd";
//type
import type { FC, ElementRef } from "react";
import styles from "./index.module.scss";
interface IProps {
  banners?: any[];
}

const contentStyle: React.CSSProperties = {
  height: "260px",
  background: "#364d79",
};

const TopSwiper: FC<IProps> = (props) => {
  const { banners = [] } = props;
  /** 定义内部的数据 */
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);

  function handleAfterChange(current: number) {
    setCurrentIndex(current);
  }

  function handlePrevClick() {
    bannerRef.current?.prev();
  }
  function handleNextClick() {
    bannerRef.current?.next();
  }

  return (
    <div className={styles["top-swiper"]}>
      <div className={classNames("wrapper", styles["content"])}>
        {/* 轮播图，比如1100px大 2000px */}
        <Carousel
          ref={bannerRef}
          className={styles["carousel"]}
          autoplay
          autoplaySpeed={3000}
          dots={false}
          effect="fade"
          afterChange={handleAfterChange}
        >
          {banners.map((item) => {
            return (
              <div className={styles["swiper-item"]} key={item.id}>
                <div
                  className={styles["swiper-bg"]}
                  style={{ backgroundImage: `url(${item.backendPicStr})` }}
                ></div>
                <Image
                  className={styles.image}
                  src={item.picStr}
                  alt={"music"}
                  priority
                  width={1100}
                  height={480}
                />
              </div>
            );
          })}
        </Carousel>

        {/* 定位-分页器 */}
        <ul className={styles.dots}>
          {banners.map((item, index) => {
            return (
              <li
                key={item.id}
                className={classNames(styles["dot"], {
                  [styles.active]: index === currentIndex,
                })}
              ></li>
            );
          })}
        </ul>
      </div>

      {/* 定位：上一页和下一页 */}
      <button className={styles.prev} onClick={handlePrevClick}>
        <span></span>
      </button>
      <button className={styles.next} onClick={handleNextClick}>
        <span></span>
      </button>
    </div>
  );
};

export default memo(TopSwiper);
TopSwiper.displayName = "TopSwiper";
