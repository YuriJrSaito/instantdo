"use client";
import Header from '@/components/header/index'
import Panel from '@/components/Panel'
import Footer from '@/components/Footer'
import { Dispatch, SetStateAction, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import { requiredAuth } from '@/contexts/auth/requiredAuth';

export type Task = {
  id: string,
  text: string
}

export default function Home() {

  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const auth = requiredAuth().verifyAuth();
  const defaultText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  type TaskList = {
    list: Array<Task>,
    update: Dispatch<SetStateAction<Array<Task>>>
  }

  const [todo, setTodo] = useState<Array<Task>>(
    [
      { id: "task1", text: defaultText },
      { id: "task2", text: defaultText },
      { id: "task3", text: defaultText } 
    ]
  );
  const [inProgress, setInProgress] = useState<Array<Task>>(
    [
      { id: "task4", text: defaultText },
      { id: "task5", text: defaultText },
      { id: "task6", text: defaultText }
    ]
  );
  const [done, setDone] = useState<Array<Task>>(
    [
      { id: "task7", text: defaultText },
      { id: "task8", text: defaultText },
      { id: "task9", text: defaultText }
    ]
  );
  const [notDefined, setNotDefined] = useState<Array<Task>>([]);

  const [placeholderProps, setPlaceholderProps] = useState({});

  const handleUpdatePanel = async (result:any, array:Array<Task>, updateArray:Dispatch<SetStateAction<Array<Task>>>) =>{
    const items = Array.from(array);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateArray(items);
  }

  const handleChangeStage = async (result:any, origin:Array<Task>, updateOrigin:Dispatch<SetStateAction<Array<Task>>>, destiny:Array<Task>, updateDestiny:Dispatch<SetStateAction<Array<Task>>>) =>{
    const cOrigin = Array.from(origin);
    const cDestinty = Array.from(destiny);

    const [reorderedItem] = cOrigin.splice(result.source.index, 1);  
    updateOrigin(cOrigin);

    cDestinty.splice(result.destination.index, 0, reorderedItem);
    updateDestiny(cDestinty);
  }

  const defineOriginDestiny = (panel:string) : TaskList =>{
    let origin_destiny:TaskList;
    switch(panel)
    {
      case 'panel1': origin_destiny = {list: todo, update: setTodo}; break;
      case 'panel2': origin_destiny = {list: inProgress, update: setInProgress}; break;
      case 'panel3': origin_destiny = {list: done, update: setDone}; break; 
      default: origin_destiny = {list: notDefined, update: setNotDefined}; break;
    } 
    return origin_destiny;
  }

  const onDragEnd = async (result:any) => {
    if (!result.destination || !result.source) {
      return;
    }

    let origin:TaskList = defineOriginDestiny(result.source.droppableId);
    let destiny:TaskList = defineOriginDestiny(result.destination.droppableId);

    if(result.source.droppableId == result.destination.droppableId)
      await handleUpdatePanel(result, origin.list, origin.update);
    else
      await handleChangeStage(result, origin.list, origin.update, destiny.list, destiny.update);
    
    setPlaceholderProps({});
  };

  const getDraggedDom = (draggableId:any) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const onDragStart = (result:any) =>{
    const draggedDOM = getDraggedDom(result.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = result.source.index;

    const parent:any = draggedDOM.parentNode;

    var clientY =
      parseFloat(window.getComputedStyle(parent).paddingTop) +
      [...parent.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(parent).paddingLeft
      ),
      clientHeight,
      clientWidth
    });
  }

  const onDragUpdate = (result:any) =>{
    if (!result.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(result.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    
    const destinationIndex = result.destination.index;
    const sourceIndex = result.source.index;
    const parent:any = draggedDOM.parentNode; 

    const childrenArray = [...parent.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1)
    ];

    var clientY =
      parseFloat(window.getComputedStyle(parent).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(parent).paddingLeft
      )
    });
  }

  return (
        <AuthProvider>
        <div className='page'>
          <div className='top'>
            <Header />
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
              <div className='panels'>
                <Panel key="panel1" title={"A fazer"} color="#B10E5C" data={todo} placeholderProps={placeholderProps} panelId="panel1"/>
                <Panel key="panel2" title={"Fazendo"} color="#0047FF" data={inProgress} placeholderProps={placeholderProps} panelId="panel2"/>
                <Panel key="panel3" title={"Feito"} color="#0AB061" data={done} placeholderProps={placeholderProps} panelId="panel3"/>
                {
                  notDefined.length > 0 &&
                  <Panel key="panel4" title={"Indefinido"} color="#0AB061" data={notDefined} placeholderProps={placeholderProps} panelId="panel4"/>
                }
                {
                  notDefined.length == 0 &&
                  <Panel key="" title="" color="" data={[]} placeholderProps={{}} panelId=""/>
                }
              </div>
            </DragDropContext>
            {
              !auth && 
              <AuthenticateAlert />
            }
          </div>

          <div className='bottom'>
            <Footer />
          </div>
        </div>
        </AuthProvider>
  )
}

export const AuthenticateAlert = () =>{
  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
      <div className='auth-alert'>
        <p>Você precisa logar para poder interagir</p>
      </div>
      </div>
    </div>
  )
}