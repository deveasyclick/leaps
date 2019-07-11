import navActionType from './nav.action-type';


const initialState = {
    type:navActionType.TOGGLE_NAV,
    show:false,
    mobile:false
}
export default (state=initialState,payload)=>{
        switch(payload.type){
            case navActionType.TOGGLE_NAV : 
            return {
                type: navActionType.TOGGLE_NAV,
                show:payload.show,
                mobile: payload.mobile
            }
            default:
                return state;
        }
}