import blogService from '../services/blogService';

const initialState = {
  blogs: [],
  title: '',
  author: '',
  url: '',
};

const reducer = (store = initialState, action) => {
  if (action.type === 'SET_BLOGS') {
    return {
      ...store,
      blogs: action.blogs,
    };
  } else if (action.type === 'ADD_BLOG') {
    return {
      ...store,
      blogs: [ ...store.blogs ].concat(action.blog),
    };
  } else if (action.type === 'REMOVE_BLOG') {
    return {
      ...store,
      blogs: [ ...store.blogs ].filter(b => b.id !== action.blog.id),
    };
  } else if (action.type === 'CHANGE_BLOGFORM') {
    return {
      ...store,
      [action.key]: action.value,
    };
  }
  return store;
};

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'SET_BLOGS',
      blogs,
    });
  };
};

export const changeBlogFormValue = (key, value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_BLOGFORM',
      key,
      value,
    });
  };
};

export const addBlog = (blog, token) => {
  return async (dispatch) => {
    const result = await blogService.post(blog, token);
    dispatch({
      type: 'ADD_BLOG',
      blog: result,
    });
  };
};

export const removeBlog = (blog, token) => {
  return async (dispatch) => {
    await blogService.remove(blog, token);
    dispatch({
      type: 'REMOVE_BLOG',
      blog
    });
  };
};

export default reducer;