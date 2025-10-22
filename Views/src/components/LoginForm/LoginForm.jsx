import React, { useCallback, useState } from 'react';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/Auth';
import { avatars } from '@utils/constants/avatars';
import AvatarSelector from '@components/AvatarSelector';
import './LoginForm.css';

const MemoUserIcon = React.memo(UserIcon);
const MemoEnvelopeIcon = React.memo(EnvelopeIcon);

const Input = React.memo(function Input({
  id,
  Icon,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  isModal,
}) {
  return (
    <div className={`login__input-wrapper ${isModal ? 'login__input-wrapper--modal' : ''}`}>
      <label htmlFor={id} className="login__input-label">
        <Icon width={30} height={20} />
        {label}
      </label>
      <input
        className={`login__input ${isModal ? 'login__input--modal' : ''}`}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={isModal ? 'off' : autoComplete}
        value={value}
        onChange={onChange}
      />
      {error && <p className="login__input-error">{error}</p>}
    </div>
  );
});

function LoginForm({ isModal }) {
  const navigate = useNavigate();
  const { handleSignin } = useAuthContext();
  const [inputUser, setInputUser] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars.get(0));

  const handleUserChange = useCallback(e => {
    const value = e.target.value;
    setInputUser(value);

    if (!value.trim()) {
      setErrorUser('Inserire un nome utente.');
    } else if (!/^[a-zA-Z0-9_-]{3,20}$/.test(value)) {
      setErrorUser('Il nome utente non è valido.');
    } else {
      setErrorUser('');
    }
  }, []);

  const handleEmailChange = useCallback(e => {
    const value = e.target.value;
    setInputEmail(value);

    if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrorEmail('Email non valida.');
    } else {
      setErrorEmail('');
    }
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      if (errorUser || errorEmail) return;

      const session = {
        new_username: inputUser,
        new_email: inputEmail,
        new_avatar: selectedAvatar,
      };
      console.log(session);

      handleSignin(session);
    },
    [inputUser, inputEmail, selectedAvatar, errorUser, errorEmail, handleSignin]
  );
  return (
    <form
      className={`login__form ${isModal ? 'login__form--modal' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={`login__input-list ${isModal ? 'login__input-list--modal' : ''}`}>
        <Input
          id="username"
          isModal={isModal}
          Icon={MemoUserIcon}
          label="Utente"
          autoComplete="username"
          value={inputUser}
          onChange={handleUserChange}
          error={errorUser}
        />
        <Input
          id="email"
          isModal={isModal}
          Icon={MemoEnvelopeIcon}
          label="Email"
          type="email"
          autoComplete="email"
          value={inputEmail}
          onChange={handleEmailChange}
          error={errorEmail}
        />
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

export default React.memo(LoginForm);
