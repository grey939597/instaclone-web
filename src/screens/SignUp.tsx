import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../routes";
import AuthLayout from "../components/auth/Container";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router-dom";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

interface IForm {
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
  result: any;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error ?? undefined,
      });
      return;
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATEACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    if (loading) {
      return;
    }
    const { firstName, lastName, email, username, password } = getValues();
    createAccount({
      variables: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
    });
  };
  const onSubmitInvalid: SubmitErrorHandler<IForm> = (data) => {};
  const clearSignUpError = () => clearErrors("result");

  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("firstName", {
              required: "First name is required.",
            })}
            type="text"
            name="firstName"
            placeholder="First Name"
            onFocus={clearSignUpError}
          />
          <FormError message={formState?.errors?.firstName?.message || ""} />
          <Input
            {...register("lastName", {})}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onFocus={clearSignUpError}
          />
          <FormError message={formState?.errors?.lastName?.message || ""} />
          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            type="text"
            name="email"
            placeholder="Email"
            onFocus={clearSignUpError}
          />
          <FormError message={formState?.errors?.email?.message || ""} />
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            type="text"
            name="username"
            placeholder="Username"
            onFocus={clearSignUpError}
          />
          <FormError message={formState?.errors?.username?.message || ""} />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
            name="password"
            placeholder="Password"
            onFocus={clearSignUpError}
          />
          <FormError message={formState?.errors?.password?.message || ""} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState?.errors?.result?.message || ""} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};
export default SignUp;
