import { UIState } from './';

type UIActionType = 
| { type: 'UI - Open Sidebar' } 
| { type: 'UI - Close Sidebar' } 
| { type: '[UIEntry] - isAddingEntry' } 
| { type: '[UIEntry] - isClosingEntry' } 

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
        
        case '[UIEntry] - isAddingEntry':
            return {   
                ...state,
                isAddingEntry: true,
            }    
        case '[UIEntry] - isClosingEntry':
            return {   
                ...state,
                isAddingEntry: false,
            }    
        
        default:
            return state; 
    }
}