import dynamic from "next/dynamic";

const CircularProgress = dynamic(() =>
  import("@material-ui/core/CircularProgress")
);

//Styles
import styles from "@css/loading.module.css";

const Movies = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <CircularProgress disableShrink />
      </div>
    </div>
  );
};

export default Movies;
