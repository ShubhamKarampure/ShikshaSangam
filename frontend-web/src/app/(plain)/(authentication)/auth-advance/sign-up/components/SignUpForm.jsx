import PasswordFormInput from "@/components/form/PasswordFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { currentYear, developedBy, developedByLink } from "@/context/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, FormCheck } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const SignUpForm = () => {
  const [firstPassword, setFirstPassword] = useState("");
  const signUpSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("please enter your email"),
    password: yup.string().required("Please enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const { control, handleSubmit, watch, getValues } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  useEffect(() => {
    setFirstPassword(getValues().password);
  }, [watch("password")]);
  return (
    <form className="mt-4" onSubmit={handleSubmit(() => {})}>
      <div className="mb-3 text-start">
        <TextFormInput
          name="email"
          control={control}
          containerClassName="input-group-lg"
          placeholder="Enter email"
        />
        <small>We&apos;ll never share your email with anyone else.</small>
      </div>
      <div className="mb-3 position-relative">
        <PasswordFormInput
          name="password"
          control={control}
          size="lg"
          placeholder="Enter new password"
        />
        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>
      <PasswordFormInput
        name="confirmPassword"
        control={control}
        size="lg"
        containerClassName="mb-3"
        placeholder="Confirm password"
      />
      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit">
          Sign me up
        </Button>
      </div>
      <p className="mb-0 mt-3 text-center">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>
  );
};
export default SignUpForm;
