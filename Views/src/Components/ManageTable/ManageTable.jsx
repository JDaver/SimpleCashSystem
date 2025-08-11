import Table from '../Table/Table';
import TableGroup from '../TableGroup/TableGroup';

function ManageTable() {
  return (
    <TableGroup defaultActive={'box1'}>
      <Table id="box1" title="Modifica Articoli" />
      <Table id="box2" title="Inserisci un nuovo articolo" />
    </TableGroup>
  );
}

export default ManageTable;
