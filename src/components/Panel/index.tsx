"use client";
import style from '@/components/Panel/panel.module.css'
import Card from '../Card';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from '@/app/page';
import { useState } from 'react';

const Panel = ({title, color, data, panelId, placeholderProps}: {title:string, color:string, data:Array<Task>, panelId:string, placeholderProps: any}) =>{


    return (
        <>        
            {
                title != "" &&
                <Droppable droppableId={panelId} key={panelId}>
                    {(provided, snapshot) => (
                        <div className={style.panel}>
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
                                {snapshot.isDraggingOver && (
                                    <div
                                        className={style.placeholder}
                                        style={{
                                            top: placeholderProps.clientY,
                                            left: placeholderProps.clientX,
                                            height: placeholderProps.clientHeight,
                                            width: placeholderProps.clientWidth
                                        }}
                                    >
                                    </div>  
                                )}
                                
                                </div>
                            </div>
                        </div>
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