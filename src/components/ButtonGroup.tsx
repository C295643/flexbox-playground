"use client";

import styles from "./ButtonGroup.module.css";

type ButtonGroupProps = {
  label: string;
  children: React.ReactNode;
};

export default function ButtonGroup({ label, children }: ButtonGroupProps) {
  return (
    <div
      className={`${styles.group} border p-2 pt-3 rounded position-relative`}
    >
      <label
        className={`position-absolute bg-white px-2 lh-1 text-secondary ${styles.label}`}
      >
        {label}
      </label>
      <div className={`${styles.toolbar} d-flex gap-1`}>{children}</div>
    </div>
  );
}
