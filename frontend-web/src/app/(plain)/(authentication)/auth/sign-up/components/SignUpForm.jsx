import PasswordFormInput from "@/components/form/PasswordFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { currentYear, developedBy, developedByLink } from "@/context/constants";
import { useEffect, useState } from "react";
import { Button, FormCheck } from "react-bootstrap";
import useSignUp from "./useSignUp.js";

const SignUpForm = () => {
  const [firstPassword, setFirstPassword] = useState("");
  const { loading, register, control, watch, getValues } = useSignUp();

  useEffect(() => {
    setFirstPassword(getValues().password1);
  }, [watch("password1")]);

  return (
    <form className="mt-4" onSubmit={register}>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <div className="mb-3">
          <TextFormInput
            name="username"
            control={control}
            containerClassName="input-group-lg"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-3">
          <TextFormInput
            name="email"
            control={control}
            containerClassName="input-group-lg"
            placeholder="Enter your email"
          />

          {/* <small>We'll never share your email with anyone else.</small> */}
        </div>
      </div>

      <div className="mb-3">
        <PasswordFormInput
          name="password1"
          control={control}
          size="lg"
          placeholder="Enter new password"
        />

        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>

      <div className="mb-3">
        <PasswordFormInput
          name="password2"
          control={control}
          size="lg"
          placeholder="Confirm password"
        />
      </div>

      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          Next
        </Button>
      </div>

      {/* <p className="mb-0 mt-3 text-center">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p> */}
    </form>
  );
};

export default SignUpForm;
