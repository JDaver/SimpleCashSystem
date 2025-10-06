import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useTheme } from '@contexts/Theme';
import { useSelectionContext, useEditingContext, useUIContext } from '@contexts/ManageItem';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import Table from '@components/Table';
import Toolbar from '@components/Toolbar';
import SelectionControls from '@themes/Minimal/SelectionControls';
import OrderByDropdown from '@themes/Minimal/OrderByDropdown';
import DeleteModal from '@themes/Minimal/DeleteModal';

function ManageItem() {
  const { theme } = useTheme();
  const { selectionMode } = useSelectionContext();
  const { activeTable, handleTableChange } = useUIContext();
  const { selectedItem } = useEditingContext();

  const InsertItem = useMemo(() => loadThemedComponent(theme, 'InsertItem'), [theme]);
  const DisplayElements = useMemo(() => loadThemedComponent(theme, 'DisplayElements'), [theme]);

  const pencilIcon = <PencilIcon width={30} height={20} />;
  const plusIcon = <PlusIcon width={30} height={20} />;

  const tabConfigs = useMemo(
    () => [
      {
        id: 'box1',
        title: 'Modifica Articoli',
        icon: pencilIcon,
        content: <DisplayElements isInteractive />,
      },
      {
        id: 'box2',
        title: selectedItem ? 'Modifica articolo' : 'Inserisci un nuovo articolo',
        icon: plusIcon,
        content: <InsertItem />,
      },
    ],
    [DisplayElements, InsertItem, selectedItem]
  );

  return (
    <Table activeId={activeTable} defaultActive="box1" onChange={handleTableChange}>
      {tabConfigs.map(({ id, title, icon, content }) => (
        <Table.Item key={id} id={id} title={title} icon={icon}>
          <Table.Section>
            {id === 'box1' && (
              <Table.Controls>
                <Toolbar.Section side="left">
                  <OrderByDropdown />
                </Toolbar.Section>
                {selectionMode && <SelectionControls />}
              </Table.Controls>
            )}
            <Table.Content className={activeTable !== id ? 'non-interactive' : ''}>
              {content}
            </Table.Content>
          </Table.Section>
        </Table.Item>
      ))}
      <DeleteModal />
    </Table>
  );
}

export default ManageItem;
