import './Styles/Button.css';

function Button({ label = "Click", onClick }) {
  return (
    <button className="btns" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
