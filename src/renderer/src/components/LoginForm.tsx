import { loginUser } from "@renderer/actions/auth";
import { ILoginFormInput } from "@renderer/interfaces/ILoginFormInput";
import { AppDispatch, RootState } from "@renderer/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "./shared/LoadingView/LoadingView";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<ILoginFormInput>();

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(({auth}: RootState) => auth.login.error)
  const isChecking = useSelector(({auth}: RootState) => auth.login.isChecking);

  const onSubmit = (data: ILoginFormInput) => {
    dispatch(loginUser(data))
  }

  if (isChecking) {
    return <LoadingView />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Welcome here!</div>
      <div className="subheader">Login and chat with other people!</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            className="form-control"
            id="password" />
        </div>
        { error && <div className="alert alert-danger small mt-3">{error.message}</div>}
        <button type="submit" className="btn btn-outline-primary mt-3">Login</button>
      </div>
    </form>
  )
}
