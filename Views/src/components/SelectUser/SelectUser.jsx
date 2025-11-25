import React, { useCallback, useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@contexts/Auth/AuthContext';
import NewUserModal from '@components/NewUserModal';
import './SelectUser.css';

const MemoPlusCircleIcon = React.memo(PlusCircleIcon);

function SelectUser() {
  const { handleLogin } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4444/users');
        const data = await res.json();
        setUsers(data || []);
      } catch (err) {
        console.error('Errore nel fetch utenti:', err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const handler = useCallback(
    (id, name) => {
      const sessionData = { id, name };
      handleLogin(sessionData);
    },
    [handleLogin]
  );

  return (
    <>
      <div className="select-user">
        <div className="select-user__list">
          <div
            className={`select-user__card ${users.length > 4 ? 'disabled' : ''}`}
            onClick={toggleModal}
          >
            <span>
              <MemoPlusCircleIcon width={40} height={30} />
            </span>
            <span>Crea nuovo utente</span>
          </div>
          {users.map(user => {
            return (
              <div
                key={user.id}
                className="select-user__card"
                onClick={() => handler(user.id, user.username)}
              >
                <span>
                  <img src={user.avatar} alt="avatar" height={60} width={60} />
                </span>
                <span>{user.username}</span>
              </div>
            );
          })}
        </div>
      </div>
      <NewUserModal showModal={showModal} onClose={toggleModal} />
    </>
  );
}

export default SelectUser;
