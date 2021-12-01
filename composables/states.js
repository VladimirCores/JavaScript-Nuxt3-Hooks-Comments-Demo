import { useAsyncData, useFetch, useRuntimeConfig, useState } from '#app'
import State from '~/constants/State';
import CommentVO from '~/model/vo/CommentVO';
import PostVO from '~/model/vo/PostVO';
import SettingsVO from '~/model/vo/SettingsVO';
import UserVO from '~/model/vo/UserVO';

const extractDataFromFetch = (fetch) => fetch?.value?.data?.value || fetch?.data;
const storageEmulator = (storage = {}) => ({
  setItem: (key, value) => storage[key] = value,
  getItem: (key) => storage[key],
});

export const useSettings = () => useState(State.SETTINGS, () => new SettingsVO(
  process.client ? window?.localStorage : storageEmulator()));

export const usePost = () => {
  const formId = (id) => `${State.POST}-${id}`;
  const state = {
    fetchPost: (id, log = console.log('> usePost -> fetchPost')) =>
      useState(formId(id), () => useAsyncData(formId(id), () => fetch(`${useRuntimeConfig().API_URL}/posts/${id}`).then(r => r.json())
        .then(postData => fetch(`${useRuntimeConfig().API_URL}/users/${postData.userId}`).then(r => r.json())
          .then(userData => new PostVO(postData, userData, state.getPost(id).comments)))
      )).value,
    fetchComments: (id, log = console.log('> usePost -> fetchComments')) =>
      fetch(`${useRuntimeConfig().API_URL}${Math.random() > 0.5 ? `/comments?postId=${id}` : `/posts/${id}/comments`}`).then(r => r.json())
        .then((comments, log = console.log('> \t', { comments, post: state.getPost(id) })) =>
          ((state.getPost(id)?.value || state.getPost(id)).comments = comments, comments)),
    getPost: (id) => useState(formId(id)).value.data || new PostVO({}, {}, []),
  }
  return state;
};

export const useUser = () => {
  const state = {
    fetchUser: (id, log = console.log('> useUser -> fetchUser')) =>
      useState(State.USER, () => useFetch(`${useRuntimeConfig().API_URL}/users/${id}`), { lazy: true }).value,
    getUser: (log = console.log('> useUser -> getUser')) =>
      extractDataFromFetch(useState(State.USER)) || new UserVO({}),
  }
  return state;
};

export const useComments = () => {
  const state = {
    fetchComments: (log = console.log('> useComments -> fetchComments')) =>
      useState(State.COMMENTS, () => useFetch(`${useRuntimeConfig().API_URL}/comments`), { lazy: true }).value,
    getAllComments: (log = () => console.log('> useComments -> getAllComments')) =>
      extractDataFromFetch(useState(State.COMMENTS)) || [],
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

