"use client";
import Header from '@/components/header/index'
import Panel from '@/components/Panel'
import Footer from '@/components/Footer'
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
      { id: "done1", text: "Done 1", draggableId: "done1"},
      { id: "done2", text: "Done 2", draggableId: "done2"},
      { id: "done3", text: "Done 3", draggableId: "done3"}
    ]
  );
  const [notDefined, setNotDefined] = useState([]);

  const handleUpdatePanel = async (result:any, array:any, updateArray:any) =>{

    const items = Array.from(array);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateArray(items);
  }

  const handleNextStage = async (result:any, origin:any, updateOrigin:any, destiny:any, updateDestiny:any) =>{
    const cOrigin = Array.from(origin);
    const cDestinty = Array.from(destiny);

    const [reorderedItem] = cOrigin.splice(result.source.index, 1);  
    updateOrigin(cOrigin);

    cDestinty.splice(result.destination.index, 0, reorderedItem);
    updateDestiny(cDestinty);
  }

  const defineOriginDestiny = async (panel:string) =>{
    let origin_destiny;
    switch(panel)
    {
      case 'panel1': origin_destiny = [todo, setTodo]; break;
      case 'panel2': origin_destiny = [inProgress, setInProgress]; break;
      case 'panel3': origin_destiny = [done, setDone]; break; 
      default: origin_destiny = [notDefined, setNotDefined]; break;
    } 
    return origin_destiny;
  }

  const onDragEnd = async (result:any) => {

      let [origin, updateOrigin] =  await defineOriginDestiny(result.source.droppableId);
      let [destiny, updateDesnity] =  await defineOriginDestiny(result.destination.droppableId);

      if(result.source.droppableId == result.destination.droppableId)
        await handleUpdatePanel(result, origin, updateOrigin);
      else
        await handleNextStage(result, origin, updateOrigin, destiny, updateDesnity);
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
                {
                  notDefined.length > 0 &&
                  <Panel key="panel4" title={"Indefinido"} color="#0AB061" data={notDefined} panelId="panel4"/>
                }
                {
                  notDefined.length == 0 &&
                  <Panel key="" title="" color="" data={notDefined} panelId=""/>
                }
              </div>
            </DragDropContext>
          </div>
          <div className='bottom'>
            <Footer />
          </div>
        </div>
  )
}
