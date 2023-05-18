import {  useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
}

export const UIProvider = ({ children }: {children: React.ReactNode}) => {

   const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE)

   
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


   return (
        <UIContext.Provider value={{
           ...state,               
           // methods  
           openSideMenu,
           closeSideMenu,   

           setIsAddingEntry
        }}>
            { children }
        </UIContext.Provider>
   )
}