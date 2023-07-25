import style from "@/components/Card/card.module.css"
import { Draggable } from "react-beautiful-dnd";

const Card = ({id, text, index}:{id:string, text:string, index: number}) =>{

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <li className={style.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className={style.cardContent}>
                        <img src="user.png" alt="" />
                        <p>{text}</p>
                    </div>
                </li>
            )}
        </Draggable>
    )
}

export default Card;