import { useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import NewUserModal from '@components/NewUserModal';
import './SelectUser.css';

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
  { id: 4, name: 'User 4' },
  { id: 5, name: 'User 5' },
];

function SelectUser() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <>
      <div className="select-user">
        <div className="select-user__list">
          {users.map(user => {
            return (
              <div key={user.id} className="select-user__card">
                <span>Avatar</span>
                <span>{user.name}</span>
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
