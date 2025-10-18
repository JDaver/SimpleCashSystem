import { useCallback, useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@contexts/Auth/AuthContext';
import NewUserModal from '@components/NewUserModal';
import './SelectUser.css';

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
          {users.map(user => {
            return (
              <div
                key={user.id}
                className="select-user__card"
                onClick={() => handler(user.id, user.username)}
              >
                <span>Avatar</span>
                <span>{user.username}</span>
              </div>
            );
          })}
          <div className="select-user__card" onClick={toggleModal}>
            <span>
              <PlusCircleIcon width={40} height={30} />
            </span>
            <span>Crea nuovo utente</span>
          </div>
        </div>
      </div>
      <NewUserModal showModal={showModal} onClose={toggleModal} />
    </>
  );
}

export default SelectUser;
