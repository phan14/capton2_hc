import React from "react";
import format from "../../../helper/format";
import styles from "./DetailedBookInfo.module.css";

function DetailedBookInfo({ data }) {
  return (
    <div className={styles.detail_info}>
      <h2>Details</h2>
      <div className={styles.detail_info_container}>
        {data.author ? (
          <div className={styles.detail_info_item}>
            <div>Author</div>
            <div>{format.arrayToString(data.author || [])}</div>
          </div>
        ) : null}
        {/* {data.publisher ? (
          <div className={styles.detail_info_item}>
            <div>NXB</div>
            <div>{data.publisher.name}</div>
          </div>
        ) : null} */}

        {data.year ? (
          <div className={styles.detail_info_item}>
            <div>Publishing year</div>
            <div>{data.year}</div>
          </div>
        ) : null}
        {data.size ? (
          <div className={styles.detail_info_item}>
            <div>Size</div>
            <div>{data.size}</div>
          </div>
        ) : null}

        {/* {data.pages ? (
          <div className={styles.detail_info_item}>
            <div>Số trang</div>
            <div>{data.pages}</div>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default DetailedBookInfo;
