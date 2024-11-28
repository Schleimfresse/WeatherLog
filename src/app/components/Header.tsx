"use client";
import styles from "@/app/page.module.css";
import Link from "next/link";
import LastWeatherUpdate from "@/app/components/LastWeatherUpdate";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname == path;

  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 -960 960 960"
          width="32"
          className={styles.icon}
        >
          <path
            d="M80-130v-60h800v60H80Zm40-120v-270h100v270H120Zm206 0v-470h100v470H326Zm207 0v-350h100v350H533Zm207 0v-590h100v590H740Z"
            fill="#fff"
          />
        </svg>
        <Link href="/">
          <span className={styles.mainHeading}>WeatherLog</span>
        </Link>
      </div>
      <div className={styles.headerBox}>
        <span className={styles.menuItems}>
          <Link
            className={isActive("/") ? styles.menuLinkActive : styles.menuLink}
            href="/"
            passHref
          >
            Home
          </Link>
        </span>
        <span className={styles.menuItems}>
          <Link
            className={isActive("/data/today")
              ? styles.menuLinkActive
              : styles.menuLink}
            href="/data/today"
            passHref
          >
            Weather today
          </Link>
        </span>
        <span className={styles.menuItems}>
          <Link
            className={isActive("/data/history")
              ? styles.menuLinkActive
              : styles.menuLink}
            href="/data/history"
            passHref
          >
            Weather history
          </Link>
        </span>
        <span className={styles.menuItems}>
          <Link
            className={isActive("/about")
              ? styles.menuLinkActive
              : styles.menuLink}
            href="/about"
            passHref
          >
            About
          </Link>
        </span>
        <LastWeatherUpdate />
      </div>
    </header>
  );
}
