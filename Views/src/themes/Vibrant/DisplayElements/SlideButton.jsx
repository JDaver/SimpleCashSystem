import ModArrow from '@assets/blueArrow.png';
import DelArrow from '@assets/redArrow.png';

export default function SlideButton({extraMode = false}){
    return(
        <button className="slide-button">
            <img src={extraMode ? DelArrow : ModArrow} alt="" />
        </button>
    )
}