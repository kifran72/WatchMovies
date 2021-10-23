import { loginGoogle, logout } from "@utils/auth/google";
import { defaultSignup, defaultLogin } from "@utils/auth/default";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export { loginGoogle, logout, defaultSignup, defaultLogin, auth };
