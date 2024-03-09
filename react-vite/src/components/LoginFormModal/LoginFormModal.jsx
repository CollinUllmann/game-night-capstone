import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      window.location.reload(false);
    }
  };

  return (
    <>
      <div className="login-header-div">
        <h1>Log In</h1>        
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form-input">
        <span className="login-form-input-span">Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-form-input">
          <span className="login-form-input-span">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <div className="login-form-errors-div">
          {errors.email && <p className="modal-error">{errors.email}</p>}
          {!errors.email && errors.password && <p className="modal-error">{errors.password}</p>}
        </div>
        <div className="login-form-submit-button-div">
          <button className="signup-form-submit-button" type="submit">Log In</button>
        </div>
        <div className="login-form-submit-button-div">
          <button className='login-modal-button'
            onClick={() => {
              setEmail('demo@aa.io')
              setPassword('password')
            }}>Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
