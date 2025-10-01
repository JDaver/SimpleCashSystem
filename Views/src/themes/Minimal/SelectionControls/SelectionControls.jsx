import React, { useCallback, useMemo } from 'react';
import { useProductsContext, useSelectionContext, useUIContext } from '@contexts/ManageItem';
import Toolbar from '@components/Toolbar';
import './SelectionControls.css';

function SelectionControls() {
  const { selectedIds, selectAll, clearSelection, allProductsIds } = useSelectionContext();
  const { setPendingDelete } = useUIContext();

  const canSelectAll = selectedIds.length < allProductsIds.length;
  const hasMultipleSelections = selectedIds.length > 1;

  const handleSelectAll = useCallback(() => selectAll(allProductsIds), [selectAll, allProductsIds]);

  const handleDelete = useCallback(
    () => setPendingDelete({ items: [...selectedIds] }),
    [setPendingDelete, selectedIds]
  );
  return (
    <Toolbar.Section>
      <Toolbar.Label className="selected-items">Selezionati ({selectedIds.length})</Toolbar.Label>
      <Toolbar.Button className="selection-btn" disabled={!canSelectAll} onClick={handleSelectAll}>
        Seleziona tutti
      </Toolbar.Button>
      <Toolbar.Button
        className="selection-btn"
        disabled={!hasMultipleSelections}
        onClick={clearSelection}
      >
        Deseleziona tutti
      </Toolbar.Button>
      <Toolbar.Button
        className="toolbar__button trigger"
        disabled={!hasMultipleSelections}
        onClick={handleDelete}
      >
        Elimina selezionati
      </Toolbar.Button>
    </Toolbar.Section>
  );
}

export default React.memo(SelectionControls);
