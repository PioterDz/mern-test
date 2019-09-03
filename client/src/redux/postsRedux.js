import axios from 'axios';
import { API_URL } from '../config';

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* SELECTORS */

export const getPosts = ({ posts }) => posts.data;
export const getNumberOfPosts = ({ posts }) => posts.data.length;
export const getRequest = ({ posts }) => posts.request;
export const getSinglePost = ({ posts }) => posts.singlePost;
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage);
export const getPresentPage = ({ posts }) => posts.presentPage;
export const getInitialPage = ({ posts }) => posts.initialPage;

/* ACTIONS */

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const LOAD_SINGLE_POST = createActionName('LOAD_SINGLE_POST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');


export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({type: RESET_REQUEST});
export const loadSinglePost = payload => ({ payload, type: LOAD_SINGLE_POST });
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE });

/* INITIAL STATE */

const initialState = {
    data: [],
    request: {
        pending: false,
        error: null,
        success: null,
    },
    singlePost: {},
    amount: 0,
    presentPage: 1,
    initialPage: 1,
};

/* THUNKS */

export const loadPostsRequest = () => {
    return async dispatch => {
        
        dispatch(startRequest());
        try {
            
            let res = await axios.get(`${API_URL}/posts`);
            dispatch(loadPosts(res.data));
            dispatch(endRequest());
    
        } catch(e) {
            dispatch(errorRequest(e.message));
        }
  
    };
};

export const loadSinglePostRequest = (id) => {
    return async dispatch => {

        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/posts/${id}`);
            await dispatch(loadSinglePost(res.data[0]));
            dispatch(endRequest());
        } catch(e) {
            dispatch(errorRequest(e.message));
        }
    }
};

export const addPostRequest = (post) => {
    return async dispatch => {

        dispatch(startRequest());
        try {
    
            let res = await axios.post(`${API_URL}/posts`, post);
            dispatch(endRequest());
    
        } catch(e) {
            dispatch(errorRequest(e.message));
        }
  
    };
};

export const editPostRequest = (post, id) => {
    return async dispatch => {

        dispatch(startRequest());
        try {
    
            let res = await axios.post(`${API_URL}/posts/edit/${id}`, post);
            dispatch(endRequest());
    
        } catch(e) {
            dispatch(errorRequest(e.message));
        }
  
    };
};

export const loadPostsByPageRequest = (page, postsPage) => {
    return async dispatch => {
  
        dispatch(startRequest());
        try {
    
            const postsPerPage = postsPage;
    
            const startAt = (page - 1) * postsPerPage;
            const limit = postsPerPage;
    
            let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);
    
            const payload = {
            posts: res.data.posts,
            amount: res.data.amount,
            postsPerPage,
            presentPage: page,
            };
    
            dispatch(loadPostsByPage(payload));
            dispatch(endRequest());
    
        } catch(e) {
            dispatch(errorRequest(e.message));
        }
  
    };
};

export const loadRandomPostRequest = () => {
    return async dispatch => {
  
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/random`);

            await dispatch(loadSinglePost(res));
            dispatch(endRequest());

        } catch(e) {
            dispatch(errorRequest(e.message));
        }

    };
}

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOAD_POSTS:
            return { ...statePart, data: action.payload };
        case START_REQUEST:
            return { ...statePart, data: [], singlePost: {}, request: { pending: true, error: null, success: null } };
        case END_REQUEST:
            return { ...statePart, request: { pending: false, error: null, success: true } };
        case ERROR_REQUEST:
            return { ...statePart, request: { pending: false, error: action.error, success: false } };
        case LOAD_SINGLE_POST:
            return { ...statePart, singlePost: action.payload };
        case RESET_REQUEST:
            return {...statePart, request: { pending: false, error: null, success: null } };
        case LOAD_POSTS_PAGE:
            return {
                ...statePart,
                postsPerPage: action.payload.postsPerPage,
                presentPage: action.payload.presentPage,
                amount: action.payload.amount,
                data: [...action.payload.posts],
            };
        default:
            return statePart;
    }
};