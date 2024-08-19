import {  useForm } from "react-hook-form";
import categories from "../../utils/staticData";
import { Label, Select, TextInput, Textarea } from "flowbite-react";

function SignupInputs() {
  const { register, watch } = useForm();
  const isCareProvider = watch('isCareProvider');

  return (
    <>
      <div>
        <Label value="Your username" />
        <TextInput type="text" placeholder="Username" {...register('username')} />
      </div>
      <div>
        <Label value="Your email" />
        <TextInput type="email" placeholder="name@company.com" {...register('email')} />
      </div>
      <div>
        <Label value="Your password" />
        <TextInput type="password" placeholder="Password" {...register('password')} />
      </div>
      <div>
        <Label value="Confirm your password" />
        <TextInput
          type="password"
          placeholder="Confirm your password"
          {...register('passwordConfirm')}
        />
      </div>

      <div>
        <Label value="Are you a care provider?" />
        <TextInput
          type="checkbox"
          id="isCareProvider"
          {...register('isCareProvider')}
        />
      </div>

      {isCareProvider && (
        <>
          <div>
            <Label value="Select Field" />
            <Select id="category" name="category">
              {categories.map((category) => (
           <option key={category.value} value={category.value}>
           {category.label}
         </option>
              ))}
            </Select>
          </div>
          <div>
            <Label value="Describe your expertise" />
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your expertise"
            />
          </div>
        </>
      )}
    </>
  );
}

export default SignupInputs;
