import { useForm } from 'react-hook-form';
import { withBaseLayout } from '../layouts/Base';
import { IChatFormInput } from '@renderer/interfaces/IChatFormInput';
import { AppDispatch, RootState } from '@renderer/store';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '@renderer/actions/chats';
import { useNavigate } from 'react-router-dom';

function ChatCreate() {
  const { register, handleSubmit } = useForm<IChatFormInput>();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(({auth}: RootState) => auth.user);

  const onSubmit = (data: IChatFormInput) => {
    dispatch(createChat(data, user?.id || "")).then(_ => navigate('/home'))
  }

  return (
    <div className="centered-view">
    <div className="centered-container">
      <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
        <div className="header">Create chat now!</div>
        <div className="subheader">Chat with people you know</div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              type="text"
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description")}
              name="description"
              className="form-control"
              id="description">
            </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              {...register("image")}
              type="text"
              className="form-control"
              id="image"
              name="image"
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary mt-2">Create</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default withBaseLayout(ChatCreate, {canGoBack: true});
