import { Label, TextInput } from "flowbite-react";

function LoginInputs() {
  return (
    <>
      <div>
        <Label value="Your email" />
        <TextInput type="email" placeholder="name@company.com" name="email" />
      </div>
      <div>
        <Label value="Your password" />
        <TextInput type="password" placeholder="**********" name="password" />
      </div>
    </>
  );
}

export default LoginInputs;
