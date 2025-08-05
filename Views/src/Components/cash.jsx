import addImg from "../assets/plus.png"
import remImg from "../assets/minus.png"

function SingleItem(){
  return(
      <div className="sngl-item">
        <p>Name product</p>
        <button className="plus-btn"><img  src={addImg}></img></button>
        <button className="minus-btn"><img src={remImg}/></button>
      </div>
  )
}

export default function(){
    return(
        <>
          
          <div className="cash">
            <div className="food">  
              <h1>Cucina</h1>
              <div className="btn-section">
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
                  <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
              
              </div>
            </div>
          </div>
        </>
    )
}