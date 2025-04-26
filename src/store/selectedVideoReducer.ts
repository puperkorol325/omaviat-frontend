import { Video } from "../types/Video";

const initialState: Video | null = null;

const selectedVideoReducer = (state = initialState, action: { type: string, payload: Video | null}) => {
    switch (action.type) {
        case "SET_SELECTED_VIDEO":
            return action.payload;
        case "RESET_SELECTED_VIDEO":
            return null;
        default: 
            return state;
    }
}

export default selectedVideoReducer;