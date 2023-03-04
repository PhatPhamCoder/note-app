import React from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithRedirect, getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQlRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithRedirect(auth, provider);

    const { data } = await graphQlRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("register", { data });
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{ marginBottom: "10px", textAlign: "center" }}
      >
        Welcome to Note App
      </Typography>
      <div className="d-flex">
        <Button
          variant="outlined"
          className="mx-auto"
          onClick={handleLoginWithGoogle}
        >
          Login with Google
        </Button>
      </div>
    </>
  );
}
