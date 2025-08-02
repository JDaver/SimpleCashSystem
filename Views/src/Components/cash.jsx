import addImg from "../assets/plus.png"

function SingleItem(){
  return(
      <div className="sngl-item">
        <p>Name product</p>
        <button className="plus-btn"><img  src={addImg}></img></button>
      </div>
  )
}

export default function(){
    return(
        <>
          
          <div className="cash">
            <div className="drinks">  
              <h1>Bevande</h1>
              <div className="btn-section">
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
              </div>
            </div>
            <div className="food">
              <h1>Cucina</h1>
              <div className="btn-section">
              <h2>Pasta alla norma</h2>
              <h2>patatine</h2>
              <h2>test</h2>
              <h2>test</h2>
              <h2>test</h2>
              </div>
            </div>
          </div>
        </>
    )
}