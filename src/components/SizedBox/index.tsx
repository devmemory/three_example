import React from "react";
import styles from "./box.module.css";

type BoxProps = {
  height?: number;
  width?: number;
};

export const SizedBox = ({ height, width }: BoxProps) => {
  return (
    <div
      className={styles.div_sized_box}
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    />
  );
};
