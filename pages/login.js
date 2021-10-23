import { useState } from "react";
import dynamic from "next/dynamic";
const Head = dynamic(() => import("next/head"));
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@utils/firebase";
import { loginGoogle, defaultLogin } from "@utils/firebase";
import { useSnackbar } from "notistack";

//Styles
import styles from "@css/login.module.css";

// Material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// Components
const Navbar = dynamic(() => import("@components/styles/navbar"));
const Background = dynamic(() => import("@components/styles/background"));

const useStyles = makeStyles((theme) => ({
  LoginForm: {
    "& > *": {
      margin: theme.spacing(2),
      width: "15rem",
      display: "flex",
      flexDirection: "column",
    },
    backgroundColor: "#383838",
    borderRadius: "11px",
  },
  LoginButton: {
    marginTop: "2rem",
    width: "11rem",
  },
  SignupButton: {
    marginTop: "1rem",
    width: "11rem",
  },
  LoginGoogleButton: {
    marginTop: "1rem",
    width: "11rem",
  },
  LoginInput: {
    backgroundColor: "#fff",
    color: "black",
  },
}));

const Login = (props) => {
  const [user, loading] = useAuthState(auth);
  const classes = useStyles();
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getLogin = async () => {
    const logged = await defaultLogin(values.email, values.password);
    if (logged.errorCode === undefined) {
      router.push("/");
    } else if (values.email === "" && values.password === "") {
      enqueueSnackbar("Please insert your login informations");
    } else if (values.email === "") {
      enqueueSnackbar("Please insert your login email");
    } else if (values.password === "") {
      enqueueSnackbar("Please insert your login password");
    } else {
      enqueueSnackbar("Invalid email or password");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/IconOnglet.jpg" />
      </Head>

      <div className={styles.form}>
        <img
          src="/Netflux.png"
          alt="Grapefruit slice atop a pile of other slices"
        />
        <h1>Login</h1>
        <form className={classes.LoginForm}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email" color="secondary">
              Email
            </InputLabel>
            <OutlinedInput
              labelWidth={40}
              id="standard-adornment-email"
              color="secondary"
              type={"text"}
              value={values.email}
              onChange={handleChange("email")}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" color="secondary">
              Password
            </InputLabel>

            <OutlinedInput
              labelWidth={70}
              id="standard-adornment-password"
              color="secondary"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="secondary"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
        <Button
          variant="contained"
          color="secondary"
          className={classes.LoginButton}
          onClick={getLogin}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.SignupButton}
          href={"/signup"}
        >
          Signup
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.LoginGoogleButton}
          onClick={loginGoogle}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
