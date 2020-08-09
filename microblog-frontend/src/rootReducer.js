import {
  LOAD_POSTS,
  LOAD_POST,
  ADD_POST,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_POST,
  UPDATE_VOTES,
} from "./actionTypes";

const INITIAL_STATE = { posts: {}, titles: [] };

function rootReducer(state = INITIAL_STATE, action) {
  let postId, tempPosts, commentsArr;

  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, titles: [...action.payload] };

    case LOAD_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.payload.id]: { ...action.payload } },
      };

    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: { ...action.payload },
        },
      };

    case REMOVE_POST:
      tempPosts = { ...state.posts };
      delete tempPosts[action.payload];
      return { ...state, posts: tempPosts };

    case UPDATE_POST:
      let comments = state.posts[action.payload.id].comments;
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: { ...action.payload, comments: [...comments] },
        },
      };

    case ADD_COMMENT:
      postId = action.payload.postId;
      commentsArr = state.posts[postId].comments;
      let newComment = action.payload.comment;
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...state.posts[postId],
            comments: [...commentsArr, newComment],
          },
        },
      };

    case REMOVE_COMMENT:
      postId = action.payload.postId;
      let commentId = action.payload.commentId;
      const tempComments = state.posts[postId].comments.filter(
        (c) => c.id !== commentId
      );
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...state.posts[postId],
            comments: [...tempComments],
          },
        },
      };

    case UPDATE_COMMENT:
      let commentToUpdate;
      postId = action.payload.postId;
      commentsArr = state.posts[postId].comments;
      let updatedCommentId = action.payload.comment.id;
      for (let c of commentsArr) {
        if (c.id === updatedCommentId) {
          commentToUpdate = { id: c.id, text: action.payload.comment.text };
          commentsArr[commentsArr.indexOf(c)] = commentToUpdate;
        }
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...state.posts[postId],
            comments: [...commentsArr],
          },
        },
      };

    case UPDATE_VOTES:
      let numVotes = action.payload.numVotes;
      postId = action.payload.postId;

      // iterate over titles to update votes
      let tempTitles = state.titles.map((title) => {
        if (title.id === +postId) {
          title = { ...title, votes: numVotes };
        }
        return title;
      });

      tempPosts = { ...state.posts };
      if (tempPosts[postId]) {
        tempPosts[postId] = { ...tempPosts[postId], votes: numVotes };
      }
      // update titles and posts votes
      return {
        ...state,
        posts: tempPosts,
        titles: tempTitles,
      };

    default:
      return state;
  }
}

export default rootReducer;
