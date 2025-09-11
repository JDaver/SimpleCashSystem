import ModArrow from '@assets/blueArrow.png';
import DelArrow from '@assets/redCross.png';

export default function SlideButton({extraMode = false}){
    return(
        <>
        
        {extraMode && (
        <button className="slide-button">
            <img src={DelArrow} alt="" />
        </button>)}
        </>
    )
}