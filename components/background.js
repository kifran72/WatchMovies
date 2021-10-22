//Styles
import styles from "@css/background.module.css";

export default function Background(props) {
  const user = props.user;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>
          {" "}
          {user && `Bonjour ${user.displayName}`} <br />
          {user && `Comment allez vous ?`}{" "}
        </span>
        <span> {!user && `Vous pouvez vous connecter`}</span>
      </div>
    </div>
  );
}
