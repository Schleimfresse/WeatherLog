import styles from "./styles.module.css";

export default function WeatherDataHeading({ text }: { text: string }) {
  return <div className={styles.dataheading}>{text}</div>;
}
