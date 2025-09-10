import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@contexts/useTheme';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import { useCallback, useMemo, useRef, useState } from 'react';
import TableContent from '@components/TableContent';

function ManageItem() {
  const { theme } = useTheme();
  const TableGroup = useMemo(() => loadThemedComponent(theme, 'TableGroup'), [theme]);
  const Table = useMemo(() => loadThemedComponent(theme, 'Table'), [theme]);
  const TableSection = useMemo(() => loadThemedComponent(theme, 'TableSection'), [theme]);
  const TableControls = useMemo(() => loadThemedComponent(theme, 'TableControls'), [theme]);
  const InsertItem = useMemo(() => loadThemedComponent(theme, 'InsertItem'), [theme]);
  const DisplayElements = useMemo(() => loadThemedComponent(theme, 'DisplayElements'), [theme]);

  const [activeTable, setActiveTable] = useState('box1');
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const selectedItemRef = useRef(null);

  const handleSwipeLeft = useCallback(item => {
    selectedItemRef.current = item;
    setShouldResetForm(false);
    setActiveTable('box2');
  }, []);

  const handleTableChange = useCallback(nextId => {
    if (nextId === 'box1') {
      selectedItemRef.current = null;
      setShouldResetForm(true);
    } else {
      setShouldResetForm(false);
    }
    setActiveTable(nextId);
  }, []);

  const tables = [
    {
      id: 'box1',
      title: 'Modifica Articoli',
      content: <DisplayElements swipeLeft={handleSwipeLeft} />,
      icon: <PencilIcon width={30} height={20} />,
    },
    {
      id: 'box2',
      title: 'Inserisci un nuovo articolo',
      content: <InsertItem itemToEdit={selectedItemRef.current} resetForm={shouldResetForm} />,
      icon: <PlusIcon width={30} height={20} />,
    },
  ];

  return (
    <TableGroup activeId={activeTable} defaultActive={'box1'} onChange={handleTableChange}>
      {tables.map(table => {
        return (
          <Table key={table.id} id={table.id} title={table.title} icon={table.icon}>
            <TableSection>
              <TableControls />
              <TableContent>{table.content}</TableContent>
            </TableSection>
          </Table>
        );
      })}
    </TableGroup>
  );
}

export default ManageItem;
