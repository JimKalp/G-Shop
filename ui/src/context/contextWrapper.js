import React from "react";
import { UserContext } from "./user_context";

const contextWrapper = (WrappedComponent) => {
  const WithHOC = (props) => {
    return (
      <UserContext.Consumer>
        {(context) => <WrappedComponent {...props} context={context} />}
      </UserContext.Consumer>
    );
  };

  return WithHOC;
};

export default contextWrapper;
