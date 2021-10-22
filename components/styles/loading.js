import dynamic from "next/dynamic";

// Matérial
const CircularProgress = dynamic(() =>
  import("@material-ui/core/CircularProgress")
);

//Styles
import styles from "@css/loading.module.css";

const Loading = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <CircularProgress disableShrink />
      </div>
    </div>
  );
};

export default Loading;
