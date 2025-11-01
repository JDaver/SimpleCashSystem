import { QueueListIcon, ReceiptPercentIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@contexts/Theme/ThemeContext';
import { useMemo, useState } from 'react';
import Table from '@components/Table';
import Toolbar from '@components/Toolbar';
import Dropdown from '@components/Dropdown';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import { useUIContext } from '@contexts/ManageItem';
import ReceiptModal from '../themes/Vibrant/ReceiptModal/ReceiptModal';

const orderByArr = ['Nome', 'Prezzo', 'Più venduto'];

function Collection() {
  const { theme } = useTheme();
  const DisplayElements = useMemo(() => loadThemedComponent(theme, 'DisplayElements'), [theme]);
  const [orderBy, setOrderBy] = useState('');
  const { activeTable, handleTableChange } = useUIContext();
  const tables = useMemo(() => {
    return [
      {
        id: 'box1',
        title: 'Storico Venduti',
        content: <DisplayElements topic="item" />,
        icon: <QueueListIcon width={30} height={20} />,
      },
      {
        id: 'box2',
        title: 'Scontrini',
        content: <DisplayElements topic="receipt" />,
        icon: <ReceiptPercentIcon width={30} height={20} />,
      },
    ];
  }, [DisplayElements]);

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
