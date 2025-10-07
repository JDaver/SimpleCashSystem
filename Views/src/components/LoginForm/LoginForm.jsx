import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/Auth';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const { handleLogin } = useAuthContext();
  const [inputUser, setInputUser] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const handleUserChange = e => {
    const value = e.target.value;
    setInputUser(value);

    if (!value.trim()) {
      setErrorUser('Inserire un nome utente.');
    } else if (!/^[a-zA-Z0-9_-]{3,20}$/.test(value)) {
      setErrorUser('Il nome utente non è valido.');
    } else {
      setErrorUser('');
    }
  };

  const handleEmailChange = e => {
    const value = e.target.value;
    setInputEmail(value);

    if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrorEmail('Email non valida.');
    } else {
      setErrorEmail('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (errorUser || errorEmail) return;

    const session = {
      user: inputUser,
      email: inputEmail,
    };

    handleLogin(session);
    navigate('/');
  };
  return (
    <form className="login__form" onSubmit={handleSubmit} noValidate>
      <div className="login__input-list">
        <div className="login__input-wrapper">
          <label htmlFor="username" className="login__input-label">
            <UserIcon width={30} height={20} />
            Utente
          </label>
          <input
            className="login__input"
            id="username"
            type="text"
            value={inputUser}
            onChange={handleUserChange}
          />
          {errorUser && <p className="login__input-error">{errorUser}</p>}
        </div>
        <div className="login__input-wrapper">
          <label htmlFor="email" className="login__input-label">
            <EnvelopeIcon width={30} height={20} />
            Email
          </label>
          <input
            className="login__input"
            id="email"
            type="email"
            value={inputEmail}
            placeholder="Facoltativa"
            onChange={handleEmailChange}
          />
          {errorEmail && <p className="login__input-error">{errorEmail}</p>}
        </div>
      </div>
      <button
        className="login__submit-btn"
        type="submit"
        disabled={!!errorUser || !!errorEmail || !inputUser.trim()}
      >
        Crea Utente
      </button>
    </form>
  );
}

export default LoginForm;
