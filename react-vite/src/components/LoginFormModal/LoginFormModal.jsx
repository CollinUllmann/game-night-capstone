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
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="login-form-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-form-submit-button-div">
          {errors.password && <p>{errors.password}</p>}
          <button type="submit">Log In</button>
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
