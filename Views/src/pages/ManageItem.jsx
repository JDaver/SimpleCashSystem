import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Table from '@themes/Minimal/Table';
import TableGroup from '@themes/Minimal/TableGroup';
import TableSection from '@themes/Minimal/TableSection';
import TableControls from '@themes/Minimal/TableControls';

const tables = [
  { id: 'box1', title: 'Modifica Articoli', icon: <PencilIcon width={30} height={20} /> },
  { id: 'box2', title: 'Inserisci un nuovo articolo', icon: <PlusIcon width={30} height={20} /> },
];

function ManageItem() {
  return (
    <TableGroup defaultActive={'box1'}>
      {tables.map(table => {
        return (
          <Table key={table.id} id={table.id} title={table.title} icon={table.icon}>
            <TableSection>
              <TableControls />
              <div style={{ width: '100%', height: '100%' }}>
                <p style={{ color: 'black', textAlign: 'center' }}>Prodotti filtrati</p>
              </div>
            </TableSection>
          </Table>
        );
      })}
    </TableGroup>
  );
}

export default ManageItem;
