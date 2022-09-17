const INIT_STATE = {
    list: []
};

export const listreducer = (state= INIT_STATE, action) =>{
    switch(action.type){
        case "ADD_LIST":
            const list = [...state.list,action.payload];
            const newList = list.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.mal_id === thing.mal_id && t.title === thing.title
            ))
            )
            return {
                ...state, 
                list: newList
            }
        case "DEL_LIST":
            const data = state.list.filter((element)=>element.mal_id !== action.payload)
            return{
                ...state,
                list: data
            }
        default:
            return state;
    }
}