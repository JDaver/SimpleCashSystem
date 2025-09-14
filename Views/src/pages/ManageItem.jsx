import { FunnelIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@contexts/useTheme';
import { useManageItem } from '@contexts/useManageItem';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import { useCallback, useMemo, useState } from 'react';
import Table from '@components/Table';
import Toolbar from '@components/Toolbar';
import Dropdown from '@components/Dropdown';
import Modal from '@components/Modal';

const orderByArr = ['Nome', 'Prezzo', 'Più venduto'];

function ManageItem() {
  const { theme } = useTheme();
  const {
    activeTable,
    selectionMode,
    selectedItems,
    memoizedProducts,
    pendingDelete,
    setPendingDelete,
    isModalOpen,
    handleDeleteConfirmed,
    handleTableChange,
    handleSelectAll,
    handleClear,
  } = useManageItem();
  const [orderBy, setOrderBy] = useState('');
  const InsertItem = useMemo(() => loadThemedComponent(theme, 'InsertItem'), [theme]);
  const DisplayElements = useMemo(() => loadThemedComponent(theme, 'DisplayElements'), [theme]);

  const tables = [
    {
      id: 'box1',
      title: 'Modifica Articoli',
      content: <DisplayElements isInteractive />,
      icon: <PencilIcon width={30} height={20} />,
    },
    {
      id: 'box2',
      title: 'Inserisci un nuovo articolo',
      content: <InsertItem />,
      icon: <PlusIcon width={30} height={20} />,
    },
  ];

  return (
    <Table activeId={activeTable} defaultActive={'box1'} onChange={handleTableChange}>
      {tables.map(table => {
        return (
          <Table.Item key={table.id} id={table.id} title={table.title} icon={table.icon}>
            <Table.Section>
              <Table.Controls>
                <Toolbar>
                  {selectionMode && (
                    <Toolbar.Section>
                      <Toolbar.Label>Selezionati ({selectedItems.length})</Toolbar.Label>
                      {selectedItems.length < memoizedProducts.length && (
                        <Toolbar.Button onClick={handleSelectAll}>Seleziona tutti</Toolbar.Button>
                      )}
                      {selectedItems.length > 1 && (
                        <Toolbar.Button onClick={handleClear}>Deseleziona tutti</Toolbar.Button>
                      )}
                      <Toolbar.Button
                        disabled={selectedItems.length < 2}
                        onClick={() => setPendingDelete({ items: selectedItems })}
                      >
                        Elimina selezionati
                      </Toolbar.Button>
                    </Toolbar.Section>
                  )}
                  <Toolbar.Section>
                    <p>Ordina per:</p>
                    <Dropdown side={'right'} selected={orderBy} onChange={setOrderBy}>
                      <Dropdown.Trigger>
                        <FunnelIcon width={30} height={20} />
                      </Dropdown.Trigger>
                      <Dropdown.Content>
                        {orderByArr.map(orderBy => (
                          <Dropdown.Item key={orderBy} option={orderBy}>
                            <span>{orderBy}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Content>
                    </Dropdown>
                  </Toolbar.Section>
                </Toolbar>
              </Table.Controls>
              <Table.Content>{table.content}</Table.Content>
            </Table.Section>
          </Table.Item>
        );
      })}
      <Modal isOpen={isModalOpen} onClose={() => setPendingDelete({ items: [] })}>
        <Modal.Portal>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Description>
              {pendingDelete.items.length > 1
                ? 'Sei sicuro di voler eliminare gli elementi selezionati?'
                : `Sei sicuro di voler eliminare ${pendingDelete.items[0]?.name}?`}
            </Modal.Description>
            <Modal.Footer>
              <button onClick={handleDeleteConfirmed}>Elimina</button>
              <Modal.Close>
                <button>Annulla</button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Portal>
      </Modal>
    </Table>
  );
}

export default ManageItem;
