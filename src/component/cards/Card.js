import "../../style/card.css";

function Card({cardSetting}) {
  return (
    <>
        <div className="card">
            <span className="card-name">{cardSetting.title}</span>
            <span className="card-value">{cardSetting.value}</span>
        </div>
    </>
  )
}

export default Card;
