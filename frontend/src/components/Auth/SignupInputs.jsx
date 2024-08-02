import { Label, TextInput } from "flowbite-react";

function SignupInputs() {
  return (
    <>
      <div>
        <Label value="Your username" />
        <TextInput type="text" placeholder="Username" name="username" />
      </div>
      <div>
        <Label value="Your email" />
        <TextInput type="email" placeholder="name@company.com" name="email" />
      </div>
      <div>
        <Label value="Your password" />
        <TextInput type="password" placeholder="Password" name="password" />
      </div>
      <div>
        <Label value="Confirm your password" />
        <TextInput
          type="password"
          placeholder="Confirm your password"
          name="passwordConfirm"
        />
      </div>
    </>
  );
}

export default SignupInputs;
