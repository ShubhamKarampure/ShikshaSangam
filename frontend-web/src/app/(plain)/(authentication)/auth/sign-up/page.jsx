import { Card } from "react-bootstrap";
import SignUpForm from "./components/SignUpForm";
import { Link } from "react-router-dom";
import PageMetaData from "@/components/PageMetaData";
import AuthLayout from "../components/AuthLayout";
import HorizontalLinearStepper from "./components/HorizontalLinearStepper";
import StudentForm from "./components/SpecificForm/StudentForm";
import { useState } from "react";

const SignUp = () => {
  
  return (
    <>
      <PageMetaData title="Sign Up" />
      <AuthLayout>
        <Card className="card-body rounded-3 p-4 p-sm-5">
          <div className="text-center">
            <h1 className="mb-2">Sign up</h1>
            <span className="d-block">
              Already have an account?{" "}
              <Link to="/auth/sign-in">Sign in here</Link>
            </span>
          </div>
          <HorizontalLinearStepper>
            {/* Pass content for each step
            <div>
              <SignUpForm />
            </div>
            <div>
              <h2>Step 2: Verify Email</h2>
              <p>Please check your email for a verification link.</p>
            </div> */}
          </HorizontalLinearStepper>
        </Card>
      </AuthLayout>
    </>
  );
};

export default SignUp;
