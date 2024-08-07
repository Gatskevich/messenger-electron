import { registerUser } from "@renderer/actions/auth";
import { IRegisterFormInput } from "@renderer/interfaces/IRegisterFormInput";
import { AppDispatch, RootState } from "@renderer/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "./shared/LoadingView/LoadingView";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<IRegisterFormInput>();

  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector(({auth}: RootState) => auth.register.error)
  const isChecking = useSelector(({auth}: RootState) => auth.register.isChecking);

  const onSubmit = (data: IRegisterFormInput) => {
    dispatch(registerUser(data))
  }

  if (isChecking) {
    return <LoadingView />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
    <div className="header">Create an account</div>
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          className="form-control"
          name="email"
          id="email"
          aria-describedby="emailHelp" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          {...register("username")}
          type="text"
          name="username"
          className="form-control"
          id="username"
          aria-describedby="emailHelp" />
      </div>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          {...register("avatar")}
          type="text"
          name="avatar"
          className="form-control"
          id="avatar"
          aria-describedby="emailHelp" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          name="password"
          type="password"
          className="form-control"
          id="password" />
      </div>
      { error && <div className="alert alert-danger small mt-3">{error.message}</div>}
      <button type="submit" className="btn btn-outline-primary mt-3">Register</button>
    </div>
  </form>
  )
}
