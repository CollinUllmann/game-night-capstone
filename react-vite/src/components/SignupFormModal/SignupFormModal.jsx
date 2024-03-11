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

  function isEmailValid(email) {
    const atSplit = email.split('@')
    if (atSplit.length != 2) return false
    if (atSplit[0].length <= 0) return false
    const periodSplit = atSplit[1].split('.')
    if (periodSplit.length <= 1) return false
    if (periodSplit.some(value => value.length <= 0)) return false
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password must be the same as Password",
      });
    }

    if (!isEmailValid(email)) {
      return setErrors({
      email: "Please enter a valid email"
    })}

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
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-form-input">
        <span className="signup-form-input-span">Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        
        <label className="signup-form-input">
        <span className="signup-form-input-span">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="signup-form-input">
        <span className="signup-form-input-span">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        <label className="signup-form-input">
          <span className="signup-form-input-span">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        <div className="signup-form-errors-div">
            {errors.username && <p className="modal-error">{errors.username}</p>}
            {errors.server && <p className="modal-error">{errors.server}</p>}
            {errors.email && <p className="modal-error">{errors.email}</p>}
            {errors.confirmPassword && <p className="modal-error">{errors.confirmPassword}</p>}
            {errors.password && <p className="modal-error">{errors.password}</p>}

        </div>
        <div className="signup-form-submit-button-div">
          
          <button className="signup-form-submit-button standard" type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
