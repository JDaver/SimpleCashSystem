import {useState} from 'react'

const Keypad = ({onInput}) => {
    const buttons = [
    "7", "8", "9",
    "4", "5", "6",
    "1", "2", "3",
    ",", "0", "⬅️",
  ];

  return (
    <div className="keypad">
        {buttons.map((btn) => (
        <button className='key-btn' key={btn} type = "button" onClick={() => onInput(btn)}>
        {btn}
        </button>
    ))}
    </div>
  );
};

export default function NumericKeypad() {
    const [value,setValue] = useState ("0");

    const handle = (input) => {
        if(input === '⬅️'){
            setValue((prev) => prev.length >1 ? prev.slice(0, -1) : "0");
        }else if(input == ','){
            if(!value.includes(",")){
                setValue(value + ",");
            }
        }else{
            const newVal = value === "0" ? input : value + input;
            setValue(newVal);
        }
    }

    return(
    <>
        <div className='sngl-label'>
            <label htmlFor="">Prezzo: </label>
            <input type="number" name="price" value={value} readOnly />
        </div>
        <Keypad onInput = {handle}/>
    </>
    );
}



