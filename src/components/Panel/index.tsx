"use client";
import style from '@/components/Panel/panel.module.css'
import Card from '../Card';
import { Droppable } from 'react-beautiful-dnd';

const Panel = ({title, color, data, panelId}: {title:string, color:string, data:any, panelId:string}) =>{

    return (
        <>        
            {
                title != "" &&
                <Droppable droppableId={panelId} key={panelId}>
                    {(provided) => (
                        <ul className={style.panel}>
                            <div className={style.top}>
                                <div className={style.title}>
                                    <h1 style={{color: `${color}`}}>{title}</h1>
                                </div>
                            </div>
                            <div className={style.bottom} {...provided.droppableProps} ref={provided.innerRef}>
                                <div className={style.cards}>
                                {
                                    data.map(({id, text}:{id: string, text: string}, index:number) => (
                                        <Card key={id} id={id} text={text} index={index}/>
                                    ))  
                                }
                                {provided.placeholder}
                                </div>
                            </div>
                        </ul>
                    )}
                </Droppable>
            }
            {
                title == "" &&
                <div className={style.emptyPanel}></div> 
            }
        </>
    )   
}

export default Panel;