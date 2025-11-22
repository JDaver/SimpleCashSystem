import { useMemo, useState } from 'react';
import { QueueListIcon, ReceiptPercentIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@contexts/Theme/ThemeContext';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import Table from '@components/Table';
import Toolbar from '@components/Toolbar';
import Dropdown from '@components/Dropdown';
import { useUIContext } from '@contexts/ManageItem';
import ReceiptModal from '@themes/Vibrant/ReceiptModal/ReceiptModal';

const orderByArr = ['Nome', 'Prezzo', 'Più venduto'];

function Collection() {
  const { theme } = useTheme();
  const SalesHistory = useMemo(() => loadThemedComponent(theme, 'SalesHistory'), [theme]);
  const ReceiptsHistory = useMemo(() => loadThemedComponent(theme, 'ReceiptsHistory'), [theme]);
  const [orderBy, setOrderBy] = useState('');
  const [activeTable, setActiveTable] = useState('box1');

  const handleTableChange = useCallback(
    nextId => {
      console.log('Cambio box a:', nextId);
      setActiveTable(nextId);
    },
    [setActiveTable]
  );

  const tables = useMemo(() => {
    return [
      {
        id: 'box1',
        title: 'Storico Venduti',
        content: <SalesHistory />,
        icon: <QueueListIcon width={30} height={20} />,
      },
      {
        id: 'box2',
        title: 'Scontrini',
        content: <ReceiptsHistory />,
        icon: <ReceiptPercentIcon width={30} height={20} />,
      },
    ];
  }, [ReceiptsHistory, SalesHistory]);

  return (
    <Table activeId={activeTable} defaultActive={'box2'} onChange={handleTableChange}>
      {tables.map(table => {
        return (
          <Table.Item key={table.id} id={table.id} title={table.title} icon={table.icon}>
            <Table.Section>
              <Table.Controls>
                <Toolbar>
                  <Toolbar.Section>
                    <p>Ordina per:</p>
                    <Dropdown side="right" selected={orderBy} onChange={setOrderBy}>
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
      <ReceiptModal />
    </Table>
  );
}

export default Collection;
