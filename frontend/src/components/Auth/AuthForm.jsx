import { useState, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import Logo from "../General/Logo";
import LoginInputs from "./LoginInputs";
import SignupInputs from "./SignupInputs";
import ResetPasswordInputs from "./ResetPasswordInputs";
import { Button, Modal, Spinner } from "flowbite-react";

function AuthForm() {
  const data = useActionData();
  console.log(data);
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  let submit = useSubmit();

  useEffect(() => {
    const modeParam = searchParams.get("mode") || "login";
    setMode(modeParam);
  }, [searchParams]);

  useEffect(() => {
    if (data && data.errors) {
      setShowModal(true);
    }
  }, [data]);

 

  return (
    <div className="min-h-screen mt-40">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex-1">
          <Form
            method="post"
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              submit(event.currentTarget);
            }}
          >
            <h1>
              {mode === "login" && "Log in"}
              {mode === "signup" && "Create a new user"}
              {mode === "reset" && "Reset your password"}
            </h1>

            {mode === "login" && <LoginInputs />}
            {mode === "signup" && <SignupInputs />}
            {mode === "reset" && <ResetPasswordInputs />}

            <div>
              <Link to={`?mode=${mode === "login" ? "signup" : "login"}`}>
                {mode === "login" ? (
                  <>
                    <span>Dont Have an account?</span>
                    <span className="text-blue-500">Sign Up</span>
                  </>
                ) : (
                  <>
                    <span>Have an account?</span>
                    <span className="text-blue-500">Sign In</span>
                  </>
                )}
              </Link>
              <div>
                <span>Forgot your password?</span>
                <Link to="?mode=reset" className="text-blue-500">
                  Reset here
                </Link>
              </div>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Save"
              )}
            </Button>
          </Form>
        </div>
      </div>
      {data && data.errors && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
            {data && data.message && <p>{data.message}</p>}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default AuthForm;
