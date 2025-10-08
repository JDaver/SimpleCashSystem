import React from 'react';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useInsertItem } from './useInsertItem';
import Dropdown from '@components/Dropdown';
import ModeSwitcher from '../ModeSwitcher/ModeSwitcher';
import './InsertItem.css';

const allergensArr = [
  'Cereali contenenti glutine',
  'Crostacei',
  'Uova',
  'Pesce',
  'Arachidi',
  'Soia',
  'Latte',
  'Frutta a guscio',
  'Sedano',
  'Semi di sesamo',
  'Senape',
  'Anidride solforosa e solfiti',
  'Lupini',
  'Molluschi',
];

function InfoColumn() {
  const {
    allergens,
    setAllergens,
    partyNames,
    isBeverage,
    setIsBeverage,
    isGlobal,
    setIsGlobal,
    partiesRelated,
    setPartiesRelated,
  } = useInsertItem();

  const handleGlobalProductCleaner = e => {
    setIsGlobal(e.target.checked);
    setPartiesRelated([]);
  };

  return (
    <div className="form__field dropdown">
      <Dropdown side={'left'} selected={allergens} onChange={setAllergens} multiple>
        <Dropdown.Trigger aria-label="Seleziona allergeni">
          <p>Allergeni</p>
          <ChevronRightIcon className="rotate" width={20} height={15} />
        </Dropdown.Trigger>
        <Dropdown.Content>
          {allergensArr.map(allergen => {
            return (
              <Dropdown.Item key={allergen} option={allergen}>
                <span className="check-icon-wrapper">
                  {allergens.includes(allergen) && <CheckIcon width={30} height={20} />}
                </span>
                <span>{allergen}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown>
      {allergens.map(allergen => {
        return <input key={allergen} type="hidden" name="allergens" value={allergen} />;
      })}

      <ModeSwitcher
        action={e => setIsBeverage(e.target.checked)}
        checked={isBeverage}
        label={'Bevanda'}
        name="isbeverage"
      />

      <label className="label-form">
        <ModeSwitcher
          action={handleGlobalProductCleaner}
          checked={isGlobal}
          label={'Prodotto Globale'}
          name="isglobal"
        />
      </label>

      <div style={isGlobal ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
        <Dropdown side={'left'} selected={partiesRelated} onChange={setPartiesRelated} multiple>
          <Dropdown.Trigger>
            <p> seleziona le feste di appartenenza</p>
            <ChevronRightIcon className="rotate" width={20} height={15} />
          </Dropdown.Trigger>
          <Dropdown.Content>
            {partyNames.map(party => {
              return (
                <Dropdown.Item key={party.party_id.toString()} option={party.party_id}>
                  <span className="check-icon-wrapper">
                    {partiesRelated.includes(party.party_id) && (
                      <CheckIcon width={30} height={20} />
                    )}
                  </span>
                  <span>{party.name_party}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Content>
        </Dropdown>
        {partiesRelated.map(party => {
          return <input key={party} type="hidden" name="partyIDs" value={String(party)} />;
        })}
      </div>
    </div>
  );
}

export default React.memo(InfoColumn);
