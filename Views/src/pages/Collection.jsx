import { QueueListIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';
import Table from '@themes/Minimal/Table';
import TableGroup from '@themes/Minimal/TableGroup';
import TableSection from '@themes/Minimal/TableSection';
import TableControls from '@themes/Minimal/TableControls';
import InsertItem from '@themes/Minimal/InsertItem';

const tables = [
  { id: 'box1', title: 'Articoli', icon: <QueueListIcon width={30} height={20} /> },
  { id: 'box2', title: 'Scontrini', icon: <ReceiptPercentIcon width={30} height={20} /> },
];

function Collection() {
  return (
    <TableGroup defaultActive={'box1'}>
      {tables.map(table => {
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
                <InsertItem />
              </div>
            </TableSection>
          </Table>
        );
      })}
    </TableGroup>
  );
}

export default Collection;
