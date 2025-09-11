import { QueueListIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@contexts/useTheme';
import { useMemo } from 'react';
import InsertItem from '@themes/Minimal/InsertItem';
import { loadThemedComponent} from '@utils/LoadThemedComponent';
import DisplayElements from '../themes/Vibrant/DisplayElements';

const tables = [
  { id: 'box1', title: 'Articoli', content : <DisplayElements topic='item'/>, icon: <QueueListIcon width={30} height={20} /> },
  { id: 'box2', title: 'Scontrini', content : <DisplayElements topic='receipt'/>, icon: <ReceiptPercentIcon width={30} height={20} /> },
];

function Collection() {

  const { theme } = useTheme();
  const TableGroup = useMemo(() => loadThemedComponent(theme, 'TableGroup'), [theme]);
  const Table = useMemo(() => loadThemedComponent(theme, 'Table'), [theme]);
  const TableSection = useMemo(() => loadThemedComponent(theme, 'TableSection'), [theme]);
  const TableControls = useMemo(() => loadThemedComponent(theme, 'TableControls'), [theme]);

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
                }}>
                {DynamicComponent}
              </div>
            </TableSection>
          </Table>
        );
      })}
    </TableGroup>
  );
}

export default Collection;
