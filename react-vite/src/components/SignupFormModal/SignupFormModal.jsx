import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password
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
      <div className="signup-header-div">
        <h1>Sign Up</h1>
      </div>
      {errors.server && <p className="modal-error">{errors.server}</p>}
      {errors.email && <p className="modal-error">{errors.email}</p>}
      {errors.confirmPassword && <p className="modal-error">{errors.confirmPassword}</p>}
      {errors.password && <p className="modal-error">{errors.password}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-form-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        
        <label className="signup-form-input">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        {errors.username && <p>{errors.username}</p>}
        <label className="signup-form-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        <label className="signup-form-input">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="signup-form-submit-button-div">
          
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
