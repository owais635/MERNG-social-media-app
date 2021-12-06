import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      const {
        data: { login: userData },
      } = result;

      authContext.login(userData);
      navigate("/");
    },
    onError(err) {
      console.log("err", err);
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
        <label>Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={onChange}
        />
        &nbsp;
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        {Object.keys(errors).length > 0 && (
          <div>
            <br />
            Errors:
            <ul>
              {Object.values(errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
