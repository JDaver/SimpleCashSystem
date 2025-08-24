import cat from '../../assets/404_cat.png';
import './Error.css';

function Error({ code, message }) {
  return (
    <div className="error">
      <img className="error__img" src={cat} alt="cat" />
      <div className="error__text-wrapper">
        <h1>Error {code}</h1>
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default Error;
