import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
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

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      // create account
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(credentials.user);

      await updateProfile(credentials.user, {
        displayName: name,
      });

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
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          required
        />
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
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
