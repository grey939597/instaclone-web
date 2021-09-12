import styled from "styled-components";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../routes";
import AuthLayout from "../components/auth/Container";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import { login, loginVariables } from "../__generated__/login";

interface IForm {
  username: string;
  password: string;
  result: any;
}

interface ILocationProps {
  message: string;
  username: string;
  password: string;
}

const Notification = styled.div`
  color: #f1c40f;
  font-weight: 600;
  margin-top: 10px;
  font-size: 12px;
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation<ILocationProps>();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data: login) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error ?? undefined,
      });
      return;
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };
  const onSubmitInvalid: SubmitErrorHandler<IForm> = (data) => {};
  const clearLoginError = () => clearErrors("result");
  return (
    <AuthLayout>
      <PageTitle title="Log in" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
              // validate: (currentValue) => currentValue.includes("grey"),
            })}
            onFocus={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(formState?.errors?.username?.message)}
          />
          <FormError message={formState?.errors?.username?.message || ""} />
          <Input
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password should be longer than 8 chars.",
              },
              required: "Password is required.",
            })}
            onFocus={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(formState?.errors?.password?.message)}
          />
          <FormError message={formState?.errors?.password?.message || ""} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState?.errors?.result?.message || ""} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
};
export default Login;
