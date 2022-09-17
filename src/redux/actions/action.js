export const ADD = (item)=>{
    return{
        type: "ADD_LIST",
        payload: item
    }
}

export const DEL = (mal_id) =>{
    return{
        type:"DEL_LIST",
        payload: mal_id
    }
}