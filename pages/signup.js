import { useState } from "react";
import dynamic from "next/dynamic";
const Head = dynamic(() => import("next/head"));
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth, defaultSignup } from "@utils/firebase";

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
import { useSnackbar } from "notistack";

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
    marginTop: "1rem",
    width: "10rem",
  },
  SignupButton: {
    marginTop: "2rem",
    width: "10rem",
  },
  LoginGoogleButton: {
    marginTop: "1rem",
  },
}));

const Signup = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showPasswordConfirm: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPasswordConfirm = () => {
    setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  const getSignup = async () => {
    if (
      values.email === "" ||
      values.password === "" ||
      values.confirmPassword === ""
    ) {
      enqueueSnackbar("Please insert your informations");
    } else if (values.password !== values.confirmPassword) {
      enqueueSnackbar("Password not match");
    } else {
      const signed = await defaultSignup(values.email, values.password);
      if (signed.errorCode === undefined) {
        router.push("/");
      } else {
        if (signed.errorCode.errorCode === "auth/invalid-email") {
          enqueueSnackbar("Please use a correct email");
        }

        if (signed.errorCode.errorCode === "auth/weak-password") {
          enqueueSnackbar("Password is to weak");
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Signup</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/IconOnglet.jpg" />
      </Head>
      <div className={styles.form}>
        <img
          src="/Netflux.png"
          alt="Grapefruit slice atop a pile of other slices"
        />
        <h1>Signup</h1>
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
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-confirmPassword"
              color="secondary"
            >
              Confirm password
            </InputLabel>

            <OutlinedInput
              labelWidth={132}
              id="standard-adornment-confirmPassword"
              color="secondary"
              type={values.showPasswordConfirm ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="secondary"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPasswordConfirm ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>

        <Button
          variant="contained"
          color="secondary"
          className={classes.SignupButton}
          onClick={getSignup}
        >
          Signup
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.LoginButton}
          href="/login"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default Signup;
