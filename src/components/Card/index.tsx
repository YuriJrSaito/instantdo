import style from "@/components/Card/card.module.css"
import { Draggable } from "react-beautiful-dnd";

const Card = ({id, text, index}:{id:string, text:string, index: number}) =>{

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div className={style.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={{backgroundColor: snapshot.isDragging ? "white" : "", 
                    borderColor: snapshot.isDragging ? "black" : "",
                    borderWidth: snapshot.isDragging ? "1px" : "",
                    ...provided.draggableProps.style}}
                >
                    <div className={style.cardContent}>
                        <img src="user.png" alt="" />
                        <p>{text}</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Card;