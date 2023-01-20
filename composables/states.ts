import type { Ref } from 'vue';
import { useRuntimeConfig, useState } from '#app';

import State from '~/constants/State';
import CommentVO from '~/model/vo/CommentVO';
import PostVO from '~/model/vo/PostVO';
import SettingsVO from '~/model/vo/SettingsVO';
import UserVO from '~/model/vo/UserVO';

const formatURL = (path: String) => `${useRuntimeConfig().public.API_URL}${path}`;
const formatPostId = (id: String) => `${State.POST}-${id}`;

export const useSettings = (): Ref<SettingsVO> => useState(State.SETTINGS, () => new SettingsVO());

interface IUsePost {
  fetchPost(id: String): Promise<PostVO>;
  fetchComments(id: String): Promise<void>;
  getPost(id: String): PostVO;
  hasNoComments(id: String): Boolean;
}

interface IUseUser {
  fetchUser(id: number): Promise<UserVO>;
}

interface IUseComments {
  fetchComments(): Promise<void>;
  getAllComments(): Array<CommentVO>;
  getTotalAmount(): number;
  getPage(index: number, amount: number): Array<CommentVO>;
}

export const useUser = (): IUseUser => ({
  fetchUser(id: number): Promise<UserVO> {
    console.log('> useUser -> fetchUser');
    return fetch(formatURL(`/users/${id}`)).then(r => r.json())
      .then((userData) => {
        console.log('> useUser -> userData:', userData);
        const userVO = new UserVO(userData);
        useState(State.USER).value = userVO;
        return userVO;
      });
  },
});

export const usePost = (): IUsePost => {
  const state: IUsePost = {
    fetchPost: (id: String): Promise<PostVO> => {
      console.log('> usePost -> fetchPost: id =', id);
      return fetch(formatURL(`/posts/${id}`)).then(r => r.json())
        .then((postData) => {
          console.log('-> postData =', postData);
          return useUser().fetchUser(postData.userId)
            .then((userData: UserVO) => {
              console.log('-> userData =', userData);
              const post = new PostVO(postData, userData, state.getPost(id).comments);
              useState(formatPostId(id)).value = post;
              return post;
            });
        });
    },

    fetchComments: (id: String): Promise<void> => {
      console.log('> usePost -> fetchComments');
      return fetch(formatURL(`${Math.random() > 0.5 ? `/comments?postId=${id}` : `/posts/${id}/comments`}`)).then(r => r.json())
        .then((comments) => {
          console.log('> \t', { comments, post: state.getPost(id) });
          state.getPost(id).comments = comments;
        });
    },

    getPost: (id: String) => useState(formatPostId(id), () => new PostVO({}, {}, [])).value,
    hasNoComments(id: String): Boolean { return state.getPost(id)?.comments.length === 0; },
  };
  return state;
};

export const useComments = (): IUseComments => {
  const state: IUseComments = {
    fetchComments(): Promise<void> {
      console.log('> useComments -> fetchComments');
      return fetch(formatURL('/comments')).then(r => r.json())
        .then(comments => useState(State.COMMENTS).value = comments);
    },

    getAllComments(): Array<CommentVO> {
      console.log('> useComments -> getAllComments');
      return useState(State.COMMENTS).value as Array<any> || [];
    },

    getTotalAmount(): number {
      console.log('> useComments -> getTotalAmount');
      return state.getAllComments().length;
    },

    getPage(index = 0, amount = 10): Array<CommentVO> {
      const startIndex = index * amount;
      const endIndex = (index + 1) * amount;
      const list = state.getAllComments() as Array<any>;
      console.log('> useComments -> getPage: comments =', Array.from(list).length, { startIndex, endIndex });
      return Array.from(list).slice(startIndex, list.length > endIndex ? endIndex : list.length)
        .map(item => new CommentVO(item));
    },

  };
  return state;
};
