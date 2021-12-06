import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import Errors from "../components/Errors";

export default function Register() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log("res", result);
      const {
        data: { register: userData },
      } = result;

      authContext.login(userData);

      navigate("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    addUser();
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <label>Username:</label>
        <input type="text" id="username" name="username" onChange={onChange} />
        &nbsp;
        <label>Email:</label>
        <input type="email" id="email" name="email" onChange={onChange} />
        &nbsp;
        <label>Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={onChange}
        />
        &nbsp;
        <label>Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={onChange}
        />
        &nbsp;
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
        <Errors errors={errors} />
      </form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
