export const updateObject=(state,updates)=>{
    return{
        ...state,
        ...updates
    }
}