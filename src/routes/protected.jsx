import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../AuthConext";

// eslint-disable-next-line react/prop-types
export function Protected({ children }) {
  const { user } = useContext(Context);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
}
