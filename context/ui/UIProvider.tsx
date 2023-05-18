import {  useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen:   boolean;
    isAddingEntry:  boolean;
    isDragging:     boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider = ({ children }: {children: React.ReactNode}) => {

   const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE)

   // funciones definidas para utilizar en cualquier Contexto de la app
   const openSideMenu = ( ) => {
        dispatch({ type: 'UI - Open Sidebar'}) 
   }
   
   const closeSideMenu = ( ) => {
        dispatch({ type: 'UI - Close Sidebar'}) 
    }
    //const closeSideMenu = () => dispatch ({ type: 'UI - Close Sidebar'}) 
    
    const setIsAddingEntry = ( isAdding: boolean ) => {
       dispatch({ type: '[UIEntry] - Set isAddingEntry', payload: isAdding })    
   }

   const startDragging = ( ) => {
    dispatch({ type: '[UIEntry] - Start Dragging'})
   }

   const endDragging = ( ) => {
    dispatch({ type: '[UIEntry] - End Dragging'})
   }


   return (
        <UIContext.Provider value={{
           ...state,               
           // methods  
           openSideMenu,
           closeSideMenu,   

           setIsAddingEntry,

           startDragging,  
           endDragging
        }}>
            { children }
        </UIContext.Provider>
   )
}