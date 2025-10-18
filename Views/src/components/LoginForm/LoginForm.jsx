import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/Auth';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import './LoginForm.css';
import AvatarSelector from '../AvatarSelector/AvatarSelector';

function LoginForm({ isModal }) {
  const navigate = useNavigate();
  const { handleSignin } = useAuthContext();
  const [inputUser, setInputUser] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(1);

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
      new_username: inputUser,
      new_email: inputEmail,
      avatarId: selectedAvatar,
    };

    handleSignin(session);
    // navigate('/');
  };
  return (
    <form
      className={`login__form ${isModal ? 'login__form--modal' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={`login__input-list ${isModal ? 'login__input-list--modal' : ''}`}>
        <div className={`login__input-wrapper ${isModal ? 'login__input-wrapper--modal' : ''}`}>
          <label htmlFor="username" className="login__input-label">
            <UserIcon width={30} height={20} />
            Utente
          </label>
          <input
            className={`login__input ${isModal ? 'login__input--modal' : ''}`}
            id="username"
            type="text"
            autoComplete="username"
            value={inputUser}
            onChange={handleUserChange}
          />
          {errorUser && <p className="login__input-error">{errorUser}</p>}
        </div>
        <div className={`login__input-wrapper ${isModal ? 'login__input-wrapper--modal' : ''}`}>
          <label htmlFor="email" className="login__input-label">
            <EnvelopeIcon width={30} height={20} />
            Email
          </label>
          <input
            className={`login__input ${isModal ? 'login__input--modal' : ''}`}
            id="email"
            type="email"
            autoComplete="email"
            value={inputEmail}
            placeholder="Facoltativa"
            onChange={handleEmailChange}
          />
          {errorEmail && <p className="login__input-error">{errorEmail}</p>}
        </div>
      </div>
      <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
      <button
        className="login__submit-btn"
        type="submit"
        disabled={!!errorUser || !!errorEmail || !inputUser.trim()}
      >
        Crea utente
      </button>
    </form>
  );
}

export default LoginForm;
