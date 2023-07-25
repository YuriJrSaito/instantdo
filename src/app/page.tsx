"use client";
import './page.module.css'
import Header from '@/components/header/index'
import Panel from '@/components/Panel'
import Footer from '@/components/Footer'
import { PanelData } from '@/components/Panel/panelData'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';

export default function Home() {

  const [todo, setTodo] = useState(
    [
      { id: "drag1", text: "TODO 1", draggableId: "todo1"},
      { id: "drag2", text: "TODO 2", draggableId: "todo2"},
      { id: "grag3", text: "TODO 3", draggableId: "todo3"}
    ]
  );
  const [inProgress, setInProgress] = useState(
    [
      { id: "inprogress1", text: "In Progress 1", draggableId: "inprogress1"},
      { id: "inprogress2", text: "In Progress 2", draggableId: "inprogress2"},
      { id: "inprogress3", text: "In Progress 3", draggableId: "inprogress3"}
    ]
  );
  const [done, setDone] = useState(
    [
      { id: "done1", text: "Done 1", done: "done1"},
      { id: "done2", text: "Done 2", done: "done2"},
      { id: "done3", text: "Done 3", done: "done3"}
    ]
  );

  const onDragEnd = (result:any) => {
    console.log(result);
    
  };

  return (
        <div className='page'>
          <div className='top'>
            <Header />
            <DragDropContext onDragEnd={onDragEnd}>
              <div className='panels'>

                <Panel key="panel1" title={"A fazer"} color="#B10E5C" data={todo} panelId="panel1"/>
                <Panel key="panel2" title={"Fazendo"} color="#0047FF" data={inProgress} panelId="panel2"/>
                <Panel key="panel3" title={"Feito"} color="#0AB061" data={done} panelId="panel3"/>

              </div>
            </DragDropContext>
          </div>
          <div className='bottom'>
            <Footer />
          </div>
        </div>
  )
}
