import { UIState } from './';

type UIActionType = 
| { type: 'UI - Open Sidebar' } 
| { type: 'UI - Close Sidebar' } 
| { type: '[UIEntry] - Set isAddingEntry', payload: boolean }    // lo hacemos con una accion
| { type: '[UIEntry] - Start Dragging' } 
| { type: '[UIEntry] - End Dragging' } 


export const uiReducer = ( state: UIState, action: UIActionType ): UIState  => {

    switch (action.type) {

        case 'UI - Open Sidebar':
            return {   
                ...state,
                sidemenuOpen: true,
            }

        case 'UI - Close Sidebar':
            return {   
                ...state,
                sidemenuOpen: false,
            }    
        
        case '[UIEntry] - Set isAddingEntry':
            return {   
                ...state,
                isAddingEntry: action.payload,
            }    

        case '[UIEntry] - Start Dragging':
            return {   
                ...state,
                isDragging: true,
            }    

        case '[UIEntry] - End Dragging':
            return {   
                ...state,
                isDragging: false,
            }    
   
        default:
            return state; 
    }
}