import { signInWithEmailAndPassword } from "firebase/auth";
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
import GithubButton from "../components/github-btn";
import styled from "styled-components";
const ResetBtn = styled.button`
  margin-top: 50px;
  background-color: black;
  font-weight: 500;
  width: 100%;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid white;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  a {
    decorator: none;
  }
`;
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      // create account
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClick = () => {
    navigate("/reset-password");
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
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
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <ResetBtn onClick={onClick}>비밀번호를 잊으셨나요?</ResetBtn>
      <GithubButton />
    </Wrapper>
  );
}
