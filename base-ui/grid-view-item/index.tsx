import { memo } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

//type
import type { FC } from "react";
import styles from "./index.module.scss";
import Item from "antd/lib/list/Item";
interface IProps {
  product?: any;
  showTip?: boolean;
  onItemClick?: (product: any) => void;
}

const GridViewItem: FC<IProps> = (props) => {
  const { product, showTip = false, onItemClick } = props;

  const products = product.products ? product.products : product;

  function handleItemClick() {
    onItemClick && onItemClick(products);
  }
  return (
    <div className={styles["grid-view-item"]} onClick={handleItemClick}>
      <div className={styles["item-image"]}>
        <Image
          className={styles.image}
          src={products.coverUrl}
          alt={"music"}
          width={263}
          height={263}
        />
        {showTip && (
          <div className={styles.tip}>
            <div>¥{products.minPrice}</div>
            <div className={styles["original-cost"]}>
              ¥{products.originalCost}
            </div>
          </div>
        )}
      </div>
      <div className={styles["item-info"]}>
        {/* label */}
        {products.couponLabelDesc && (
          <span className={styles.label}>{products.couponLabelDesc}</span>
        )}
        {/* Link */}
        <Link href={`/detail?id${products.id}`} className={styles.name}>
          {products.name}
        </Link>
      </div>
      <div className={styles["item-price"]}>¥{products.minPrice}</div>
    </div>
  );
};

export default memo(GridViewItem);
GridViewItem.displayName = "GridViewItem";
