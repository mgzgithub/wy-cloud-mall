import { memo, useState } from "react";
import type { KeyboardEvent } from "react";
import classNames from "classnames";

//type
import type { FC } from "react";
import type { ISearchSuggest } from "@/service/home";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
interface IProps {
  searchData?: ISearchSuggest;
}

const Search: FC<IProps> = (props) => {
  const { searchData } = props;
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(
    searchData?.defaultKey || "蓝牙耳机"
  );

  const router = useRouter();

  function handleInputFoucs(isFocus: boolean) {
    setInputFocus(isFocus);
  }

  // 为什么不用能用click，因为click完成的时候面板已经被销毁了
  function handleItemClick(name: string) {
    setPlaceholder(name);
    // 跳转到搜索页面
    router.push({
      pathname: `/search`,
      query: {
        q: name,
      },
    });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Enter") {
      const target = event.target as HTMLInputElement;
      handleItemClick(target.value);
      setInputFocus(false);
    }
  }

  return (
    <div className={styles["search"]}>
      <div className={styles["search-bg"]}>
        <input
          className={styles.input}
          onFocus={() => handleInputFoucs(true)}
          onBlur={() => handleInputFoucs(false)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={placeholder}
        />
      </div>

      <div
        className={classNames(
          styles["search-panel"],
          styles[inputFocus ? "show" : "hide"]
        )}
      >
        <div className={styles.shadow}></div>
        <h2>热门搜索</h2>
        <ul>
          {searchData?.configKey &&
            searchData?.configKey.map((item: any, index: number) => {
              return (
                <li
                  onMouseDown={() => handleItemClick(item[index + 1])}
                  key={item[index + 1]}
                >
                  {item[index + 1]}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default memo(Search);
Search.displayName = "Search";
