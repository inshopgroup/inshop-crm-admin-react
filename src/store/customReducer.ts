const defaultState = {
    customs: [],
}
const CREATE = "CREATE"
const REMOVE = "REMOVE"
export const customReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case CREATE:
            return {...state, customs: [...state.customs, action.payload]}
        case REMOVE:
            return {...state, customs: state.customs.filter(({id}) => id !== action.payload)}
        default:
            return state
    }
}

export const createCustomAction = (payload: object) => ({type: CREATE, payload})
export const removeCustomAction = (payload: object) => ({type: REMOVE, payload})