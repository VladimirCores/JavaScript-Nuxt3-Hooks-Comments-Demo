class PostVO {
  set comments(value: any[]) {
    this._comments = value;
  }

  get comments(): any[] {
    return this._comments;
  }

  private _comments: any[];
  get user(): any {
    return this._user;
  }

  private readonly _user: any;
  get post(): any {
    return this._post;
  }

  private readonly _post: any;
  constructor(postData: any, userData: any, comments: any[] = []) {
    this._post = postData;
    this._user = userData;
    this._comments = comments;
  }
}

export default PostVO;
