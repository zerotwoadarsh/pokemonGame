import "../css/card.css"

export default function Card({ img, name,handleCardClick }) {
    return (
        <>
            <div className="card" onClick={()=>handleCardClick(name)}>
                <div className="card-image-wrapper">
                    <img src={img} alt="" />
                </div>
                <div className="card-name">{name}</div>
            </div>
        </>
    );
}
