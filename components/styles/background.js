//Styles
import styles from "@css/background.module.css";

const Background = ({ user }) => {
  const filter = /^(.*?)\@/;
  let username = "";
  if (user) {
    username = user.displayName ? user.displayName : filter.exec(user.email)[1];
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>
          {" "}
          {`Bonjour ${username}`} <br />
          {user && `Comment allez vous ?`}{" "}
        </span>
      </div>
    </div>
  );
};

export default Background;
