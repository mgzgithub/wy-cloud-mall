import { memo, useEffect } from "react";
import classNames from "classnames";

//type
import type { FC } from "react";
import styles from "./index.module.scss";
// import axios from "axios";
interface IProps {
  datas?: any[];
}

const Category: FC<IProps> = (props) => {
  const { datas = [] } = props;

  return (
    <div className={styles.category}>
      <div>Category</div>
    </div>
  );
};

export default memo(Category);
Category.displayName = "Category";
