import { Label, TextInput } from "flowbite-react";

function ResetPasswordInputs() {
  return (
    <>
      <div>
        <Label value="Your email" />
        <TextInput type="email" placeholder="name@company.com" name="email" />
      </div>
    </>
  );
}

export default ResetPasswordInputs;
