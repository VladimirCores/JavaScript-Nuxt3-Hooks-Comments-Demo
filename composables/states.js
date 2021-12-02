import { useRuntimeConfig, useState } from '#app'
import State from '~/constants/State';
import CommentVO from '~/model/vo/CommentVO';
import PostVO from '~/model/vo/PostVO';
import SettingsVO from '~/model/vo/SettingsVO';
import UserVO from '~/model/vo/UserVO';

const storageEmulator = (storage = {}) => ({
  setItem: (key, value) => storage[key] = value,
  getItem: (key) => storage[key],
});
const urlPath = (path) => `${useRuntimeConfig().API_URL}${path}`;

export const useSettings = () => useState(State.SETTINGS, () => new SettingsVO(
  process.client ? window?.localStorage : storageEmulator()));

export const usePost = () => {
  const formId = (id) => `${State.POST}-${id}`;
  const state = {
    fetchPost: (id, log = console.log('> usePost -> fetchPost')) =>
      fetch(urlPath(`/posts/${id}`)).then(r => r.json())
        .then(postData => fetch(`${useRuntimeConfig().API_URL}/users/${postData.userId}`).then(r => r.json())
          .then(userData => useState(formId(id)).value = new PostVO(postData, userData, state.getPost(id).comments))),
    fetchComments: (id, log = console.log('> usePost -> fetchComments')) =>
      fetch(urlPath(`${Math.random() > 0.5 ? `/comments?postId=${id}` : `/posts/${id}/comments`}`)).then(r => r.json())
        .then((comments, log = console.log('> \t', { comments, post: state.getPost(id) })) =>
          (state.getPost(id).comments = comments, comments)),
    getPost: (id) => useState(formId(id), () => new PostVO({}, {}, [])).value,
  }
  return state;
};

export const useUser = () => {
  console.log('> useUser -> process.server =', process.server);
  if (process.server) return {};
  const state = {
    fetchUser: (id, log = console.log('> useUser -> fetchUser')) =>
      fetch(`${useRuntimeConfig().API_URL}/users/${id}`).then(r => r.json())
        .then((user) => useState(State.USER).value = new UserVO(user)),
    getUser: (log = console.log('> useUser -> getUser')) => useState(State.USER).value
  }
  return state;
};

export const useComments = () => {
  if (process.server) return {};
  const state = {
    fetchComments: (log = console.log('> useComments -> fetchComments')) =>
      fetch(`${useRuntimeConfig().API_URL}/comments`).then(r => r.json())
        .then((comments) => useState(State.COMMENTS).value = comments),
    getAllComments: (log = () => console.log('> useComments -> getAllComments')) =>
      useState(State.COMMENTS).value || [],
    getTotalAmount: (log = () => console.log('> useComments -> getTotalAmount')) =>
      state.getAllComments().length,
    getPage: (index = 0, amount = 10) => ((
      list, startIndex = index * amount, endIndex = (index + 1) * amount) => {
      console.log('> useComments -> getPage: comments =', Array.from(list).length, startIndex, endIndex);
      return Array.from(list).slice(startIndex, list.length > endIndex ? endIndex : list.length)
        .map((item) => new CommentVO(item))
    })(state.getAllComments()),
  }
  return state;
};

