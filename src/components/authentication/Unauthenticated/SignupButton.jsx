import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@material-ui/core";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
      <Button color="inherit" 
        onClick={() =>
          loginWithRedirect({
            screen_hint: "signup",
          })
        }>
        Sign Up
      </Button>
  );
};

export default SignupButton;