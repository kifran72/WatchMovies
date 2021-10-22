//Styles
import styles from "@css/background.module.css";

const Background = (props) => {
  const user = props.user;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>
          {" "}
          {user && `Bonjour ${user.displayName}`} <br />
          {user && `Comment allez vous ?`}{" "}
        </span>
        <h1>{!user && `Netflux `}</h1>
      </div>
    </div>
  );
};

export default Background;
