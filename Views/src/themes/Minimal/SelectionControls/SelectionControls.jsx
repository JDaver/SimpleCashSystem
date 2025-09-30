import React, { useCallback, useMemo } from 'react';
import { useProductsContext, useSelectionContext, useUIContext } from '@contexts/ManageItem';
import Toolbar from '@components/Toolbar';
import './SelectionControls.css';

function SelectionControls() {
  const { filteredProducts } = useProductsContext();
  const { selectedIds, selectAll, clearSelection } = useSelectionContext();
  const { setPendingDelete } = useUIContext();

  const allProductIds = useMemo(() => filteredProducts.map(p => p.id), [filteredProducts]);
  const canSelectAll = selectedIds.length < allProductIds.length;
  const hasMultipleSelections = selectedIds.length > 1;

  const handleSelectAll = useCallback(() => selectAll(allProductIds), [selectAll, allProductIds]);

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
