import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const formMethods = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      await signIn(data);
      setIsLoading(false);
      navigate("/tasks");
    } catch (error) {
      setIsLoading(false);
      // handle error, e.g. show a message to the user
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            {...register("username", { required: true })}
            placeholder="Username"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
        </div>
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

export default SignInForm;
