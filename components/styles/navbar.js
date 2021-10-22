import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { login, logout } from "@utils/auth/google";
const Link = dynamic(() => import("next/link"));
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

// Styles
import styles from "@css/navbar.module.css";

// Material
const Button = dynamic(() => import("@material-ui/core/Button"));
const AppBar = dynamic(() => import("@material-ui/core/AppBar"));

// Components

const Navbar = (props) => {
  const { user, page } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  return (
    <AppBar className={trigger ? styles.navFixed : styles.navbar}>
      <div className={styles.listeButton}>
        <img
          className={styles.logo}
          src="/Netflux.png"
          alt="Grapefruit slice atop a pile of other slices"
        />
        {/* <Button className={styles.link}>Category</Button> */}
        <Link href="/login">
          <Button onClick={logout} className={styles.link}>
            Logout
          </Button>
        </Link>
      </div>
    </AppBar>
  );
};

export default Navbar;
