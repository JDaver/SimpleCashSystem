import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePartyNames } from '@hooks/productsHook';
import Dropdown from '@components/Dropdown';
import { useState } from 'react';

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


export default function InfoColumn(){
    const partyNames = usePartyNames();
    const [partiesRelated,setPartiesRelated] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [isBeverage, setIsBeverage] = useState(false);
    const [isGlobal, setIsGlobal] = useState(false);

    const handleGlobalProductCleaner = (e) => {
    setIsGlobal(e.target.checked);
    setPartiesRelated([]);
  }



    return(
        
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
            {allergens.map((allergen) => {
              return <input key={allergen} type="hidden" name="allergens" value={allergen} />
            })}

            <label className='label-form'>
              e' una bevanda <input className="checkBox" type="checkBox" name='isbeverage' checked={isBeverage} onChange={(e) => setIsBeverage(e.target.checked)}/>  
            </label>

            <label className='label-form'> 
              e' un prodotto globale <input className="checkBox" type="checkbox" name='isglobal' checked={isGlobal} onChange={handleGlobalProductCleaner} />
            </label>
            
            <div style={isGlobal? {opacity: 0.4,  pointerEvents:'none'} : {}}>
              <Dropdown side={'left'} selected={partiesRelated} onChange={setPartiesRelated} multiple>
                <Dropdown.Trigger>
                  <p> seleziona le feste di appartenenza</p>
                  <ChevronRightIcon className="rotate" width={20} height={15} />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  {partyNames.map((party) => {
                    return (
                      <Dropdown.Item key={party.id.toString()} option={party.id}>
                       <span className="check-icon-wrapper">
                        {partiesRelated.includes(party.id) && <CheckIcon width={30} height={20} />}
                      </span>
                      <span>{party.name_party}</span>
                    </Dropdown.Item>
                    );
                  })}
                </Dropdown.Content>
              </Dropdown>
              {partiesRelated.map((id) => {
              return <input key={id} type="hidden" name="partyIDs" value={String(id)} />
            })}
            </div>
          </div>
    )
}