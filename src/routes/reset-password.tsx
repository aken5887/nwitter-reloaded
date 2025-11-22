import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Input,
  Title,
  Wrapper,
  Error,
  Switcher,
} from "../components/auth-componenets";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "") return;
    try {
      // create account
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Forget My Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Reset Password"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
