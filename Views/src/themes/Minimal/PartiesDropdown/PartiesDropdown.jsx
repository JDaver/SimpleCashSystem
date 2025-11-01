import Dropdown from '@components/Dropdown';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePartyNames } from '../../../Hooks/productsHook';
import { memo } from 'react';
import { useInsertItem } from '../InsertItem/useInsertItem';

function PartiesDropdown({ disabled, parties, setParties }) {
  const partyNames = usePartyNames();
  const { partiesRelated } = useInsertItem();
  return (
    <Dropdown disabled={disabled} selected={parties} onChange={setParties} multiple>
      <Dropdown.Trigger>
        <span>Seleziona Festa</span>
        <ChevronRightIcon className="rotate" width={20} height={15} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {partyNames.map(party => (
          <Dropdown.Item key={party.party_id} option={party.party_id}>
            <span className="check-icon-wrapper">
              {partiesRelated.includes(party.party_id) && <CheckIcon width={30} height={20} />}
            </span>
            <span>{party.name_party}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}

export default memo(PartiesDropdown);
