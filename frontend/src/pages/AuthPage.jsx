/* eslint-disable react-refresh/only-export-components */
import { json, useActionData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthForm from "../components/Auth/AuthForm";
import { resetPassword, signin, signup } from "../store/action/authAction";

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const actionData = useActionData();

  async function handleAuth(authData, mode) {
    try {
      let response;
      if (mode === "login") {
        response = await dispatch(signin(authData));
        console.log(response);
      } else if (mode === "signup") {
        response = await dispatch(signup(authData));
      } else if (mode === "reset") {
        response = await dispatch(resetPassword(authData));
      }
      const token = response.payload.token;
      console.log(token);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  }

  if (actionData) {
    const { authData, mode } = actionData;
    handleAuth(authData, mode);
  }

  return <AuthForm />;
}

export default AuthPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup" && mode !== "reset")
    throw json({ message: "Unsupported mode." }, { status: 422 });

  const data = await request.formData();
  let authData;

  if (mode === "login") {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  } else if (mode === "signup") {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
      isCareProvider: data.get("isCareProvider") === "on",
      username: data.get("username"),
      passwordConfirm: data.get("passwordConfirm"),
    };
    if (authData.isCareProvider) {
      authData.description = data.get("description");
      authData.category = data.get("category");
    }
  } else if (mode === "reset") {
    authData = {
      email: data.get("email"),
    };
  }

  console.log(authData);

  return { authData, mode };
}
