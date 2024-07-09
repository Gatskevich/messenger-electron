import LoginForm from "@renderer/components/LoginForm";
import RegisterForm from "@renderer/components/RegisterForm";
import { RootState } from "@renderer/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Welcome() {
  const [isLoginView, setIsLogin] = useState(true);

  const user = useSelector(({auth}: RootState) => auth.user);

  const optInText = isLoginView ?
    ['Need an account?', 'Register'] :
    ['Already registered?', 'Login']

  if (user) {
    return <Navigate replace to="/home" />
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
      { isLoginView ? <LoginForm /> : <RegisterForm /> }
        <div className="form-text text-muted mt-2">
          {optInText[0]}
          <span
            onClick={() => setIsLogin(!isLoginView)}
            className="btn-link ms-2">{optInText[1]}</span>
          </div>
      </div>
    </div>
  )
}
