import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@contexts/useTheme';
import { loadThemedComponent} from '@utils/LoadThemedComponent';
import { useMemo } from 'react';
import DisplayElements from '../themes/Vibrant/DisplayElements';



function ManageItem() {
  
const { theme } = useTheme();
  const TableGroup = useMemo(() => loadThemedComponent(theme, 'TableGroup'), [theme]);
  const Table = useMemo(() => loadThemedComponent(theme, 'Table'), [theme]);
  const TableSection = useMemo(() => loadThemedComponent(theme, 'TableSection'), [theme]);
  const TableControls = useMemo(() => loadThemedComponent(theme, 'TableControls'), [theme]);
  const InsertItem = useMemo(() => loadThemedComponent(theme, 'InsertItem'), [theme]);

  const tables = [
  { id: 'box1', title: 'Elenco Articoli', content: <DisplayElements/>, icon: <PencilIcon width={30} height={20} /> },
  { id: 'box2', title: 'Inserisci un nuovo articolo', content:<InsertItem/>, icon: <PlusIcon width={30} height={20} /> },
];

  return (
    <TableGroup defaultActive={'box1'}>
      {tables.map(table => {
        const DynamicComponent = table.content;
        return (
          <Table key={table.id} id={table.id} title={table.title} icon={table.icon}>
            <TableSection>
              <TableControls />
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {DynamicComponent}
              </div>
            </TableSection>
          </Table>
        );
      })}
    </TableGroup>
  );
}

export default ManageItem;
