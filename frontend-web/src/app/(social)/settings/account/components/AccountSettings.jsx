import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextFormInput from "@/components/form/TextFormInput";
import TextAreaFormInput from "@/components/form/TextAreaFormInput";
import DateFormInput from "@/components/form/DateFormInput";
import PasswordFormInput from "@/components/form/PasswordFormInput";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { BsPlusCircleDotted, BsTrash } from "react-icons/bs";
import { useAuthContext } from "@/context/useAuthContext";
import { useProfileContext } from "@/context/useProfileContext";
import { updateUserProfile } from "@/api/profile";

const AccountSettings = () => {
  const { user } = useAuthContext(); // Current logged-in user
  const { profile } = useProfileContext(); // Current user's profile

  const [userRole, setUserRole] = useState(profile.role);

  const [firstPassword, setFirstPassword] = useState("");

  
  const onSubmit = async (data) => {
    try {

    // Send the FormData to the API
    const response = await updateUserProfile(data,profile.id);

      // Handle the response (e.g., show success message)
      console.log(response.data);
    } catch (error) {
      // Handle the error (e.g., show error message)
      console.error("Error updating profile:", error);
    }
  };

  // Dynamic validation schema
  const getValidationSchema = (role) => {
    const baseSchema = {
      full_name: yup.string().required("Please enter full name"),
      contact_number: yup.string().required("Please enter contact number"),
      bio: yup.string().max(500, "Bio must be max 500 characters"),
      location: yup.string(),
      social_links: yup.object().shape({
        linkedin: yup.string().url("Invalid LinkedIn URL"),
        twitter: yup.string().url("Invalid Twitter URL"),
        github: yup.string().url("Invalid GitHub URL"),
      }),
      preferences: yup.object().shape({
        domains: yup.array().of(yup.string()),
        interests: yup.array().of(yup.string()),
      }),
    };

    const roleSpecificFields = {
      student: {
        ...baseSchema,
        enrollment_year: yup
          .number()
          .positive()
          .integer()
          .required("Enter enrollment year"),
        current_program: yup.string().required("Enter current program"),
        expected_graduation_year: yup
          .number()
          .positive()
          .integer()
          .required("Enter expected graduation year"),
        specialization: yup.string(),
      },
      alumni: {
        ...baseSchema,
        graduation_year: yup
          .number()
          .positive()
          .integer()
          .required("Enter graduation year"),
        current_employment: yup.object().shape({
          company: yup.string().required("Enter current company"),
          position: yup.string().required("Enter current position"),
        }),
        career_path: yup.string().required("Describe your career path"),
        specialization: yup.string(),
      },
      college_staff: {
        ...baseSchema,
        position: yup.string().required("Enter position"),
        department: yup.string().required("Enter department"),
      },
      college_admin: baseSchema,
    };

    return yup.object().shape(roleSpecificFields[role]);
  };

  // Default values based on role
  const getDefaultValues = (role) => {
    const baseDefaults = {
      full_name: profile?.full_name || "",
      contact_number: profile?.contact_number || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      social_links: {
        linkedin: profile?.social_links?.linkedin || "",
        twitter: profile?.social_links?.twitter || "",
        github: profile?.social_links?.github || "",
      },
      preferences: {
        domains: profile?.preferences?.domains || [],
        interests: profile?.preferences?.interests || [],
      },
    };

    const roleSpecificDefaults = {
      student: {
        ...baseDefaults,
        enrollment_year: profile?.studentprofile?.enrollment_year || "",
        current_program: profile?.studentprofile?.current_program || "",
        expected_graduation_year:
          profile?.studentprofile?.expected_graduation_year || "",
        specialization: profile?.studentprofile?.specialization || "",
      },
      alumni: {
        ...baseDefaults,
        graduation_year: profile?.alumnusprofile?.graduation_year || "",
        current_employment: profile?.alumnusprofile?.current_employment || {
          company: "",
          position: "",
        },
        career_path: profile?.alumnusprofile?.career_path || "",
        specialization: profile?.alumnusprofile?.specialization || "",
      },
      college_staff: {
        ...baseDefaults,
        position: profile?.collegestaffprofile?.position || "",
        department: profile?.collegestaffprofile?.department || "",
      },
      college_admin: baseDefaults,
    };

    return roleSpecificDefaults[role];
  };

  // Render role-specific additional fields
  const renderRoleSpecificFields = () => {
    switch (userRole) {
      case "student":
        return (
          <>
            <TextFormInput
              name="enrollment_year"
              label="Enrollment Year"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextFormInput
              name="current_program"
              label="Current Program"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextFormInput
              name="expected_graduation_year"
              label="Expected Graduation Year"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextFormInput
              name="specialization"
              label="Specialization"
              control={control}
              containerClassName="col-sm-6"
            />
          </>
        );
      case "alumni":
        return (
          <>
            <TextFormInput
              name="graduation_year"
              label="Graduation Year"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextFormInput
              name="current_employment.company"
              label="Current Company"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextFormInput
              name="current_employment.position"
              label="Current Position"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextAreaFormInput
              name="career_path"
              label="Career Path"
              control={control}
              containerClassName="col-12"
              rows={3}
            />
            <TextFormInput
              name="specialization"
              label="Specialization"
              control={control}
              containerClassName="col-sm-6"
            />
          </>
        );
      case "college_staff":
        return (
          <>
            <TextFormInput
              name="department"
              label="Department"
              control={control}
              containerClassName="col-sm-6"
            />
            <TextFormInput
              name="position"
              label="Position"
              control={control}
              containerClassName="col-sm-6"
            />
          </>
        );
      default:
        return null;
    }
  };

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(getValidationSchema(userRole)),
    defaultValues: getDefaultValues(userRole),
  });

  // Domains and Interests Field Arrays
  const {
    fields: domainFields,
    append: appendDomain,
    remove: removeDomain,
  } = useFieldArray({
    control,
    name: "preferences.domains",
  });

  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({
    control,
    name: "preferences.interests",
  });

  // Password Change Component (kept from previous version)
  const ChangePassword = () => {
    const resetPasswordSchema = yup.object().shape({
      currentPass: yup.string().required("Please enter current Password"),
      newPassword: yup
        .string()
        .min(8, "Password must be minimum 8 characters")
        .required("Please enter Password"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
    });

    const passwordForm = useForm({
      resolver: yupResolver(resetPasswordSchema),
    });

    return (
      <Card className="mt-4">
        <CardHeader className="border-0 pb-0">
          <h1 className="h5 card-title">Change Password</h1>
        </CardHeader>
        <CardBody>
          <form
            className="row g-3"
            onSubmit={passwordForm.handleSubmit(() => {})}
          >
            <PasswordFormInput
              name="currentPass"
              label="Current password"
              control={passwordForm.control}
              containerClassName="col-12"
            />
            <Col xs={12}>
              <PasswordFormInput
                name="newPassword"
                label="New password"
                control={passwordForm.control}
                onChange={(e) => setFirstPassword(e.target.value)}
              />
              <div className="mt-2">
                <PasswordStrengthMeter password={firstPassword} />
              </div>
            </Col>
            <PasswordFormInput
              name="confirmPassword"
              label="Confirm password"
              control={passwordForm.control}
              containerClassName="col-12"
            />
            <Col xs={12} className="text-end">
              <Button
                variant="primary"
                type="submit"
                size="sm"
                className="mb-0"
              >
                Update password
              </Button>
            </Col>
          </form>
        </CardBody>
      </Card>
    );
  };

  return (
  <>
    <Card className="mb-4">
      <CardHeader className="border-0 pb-0">
        <h1 className="h5 card-title">Account Settings</h1>
      </CardHeader>
      <CardBody>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

          <h5>Basic Profile</h5>
          <TextFormInput
            name="full_name"
            label="Full Name"
            control={control}
            containerClassName="col-12"
          />
          <TextFormInput
            name="contact_number"
            label="Contact Number"
            control={control}
            containerClassName="col-sm-6"
          />
          <TextFormInput
            name="location"
            label="Location"
            control={control}
            containerClassName="col-12"
          />
          <Col xs={12}>
            <TextAreaFormInput
              name="bio"
              label="Bio"
              rows={4}
              control={control}
              placeholder="Tell us about yourself"
            />
          </Col>

          <hr className="my-4" /> {/* Added break here */}

          <Col xs={12}>
            <h5>Social Links</h5>
            <div className="row">
              <TextFormInput
                name="social_links.linkedin"
                label="LinkedIn"
                control={control}
                containerClassName="col-sm-4"
              />
              <TextFormInput
                name="social_links.twitter"
                label="Twitter"
                control={control}
                containerClassName="col-sm-4"
              />
              <TextFormInput
                name="social_links.github"
                label="GitHub"
                control={control}
                containerClassName="col-sm-4"
              />
            </div>
          </Col>

          <hr className="my-4" /> {/* Added break here */}

          <h5>Education & Work Experience</h5>
          {renderRoleSpecificFields()}

          <hr className="my-4" /> {/* Added break here */}

          <Col xs={12}>
            <h5>Domains</h5>
            {domainFields.map((field, index) => (
              <div key={field.id} className="d-flex mb-2">
                <TextFormInput
                  name={`preferences.domains.${index}`}
                  control={control}
                  containerClassName="flex-grow-1 me-2"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeDomain(index)}
                >
                  <BsTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => appendDomain("")}
            >
              Add Domain
            </Button>
          </Col>

          <hr className="my-4" /> {/* Added break here */}

          <Col xs={12}>
            <h5>Interests</h5>
            {interestFields.map((field, index) => (
              <div key={field.id} className="d-flex mb-2">
                <TextFormInput
                  name={`preferences.interests.${index}`}
                  control={control}
                  containerClassName="flex-grow-1 me-2"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeInterest(index)}
                >
                  <BsTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => appendInterest("")}
            >
              Add Interest
            </Button>
          </Col>

          <hr className="my-4" /> {/* Added break here */}

          <Col xs={12} className="text-end">
            <Button
              variant="primary"
              type="submit"
              size="sm"
              className="mb-0"
            >
              Save changes
            </Button>
          </Col>
        </form>
      </CardBody>
    </Card>
    <ChangePassword />
  </>
);
};

export default AccountSettings;
