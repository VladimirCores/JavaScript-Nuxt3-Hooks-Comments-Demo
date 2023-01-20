class CommentVO {
  get postId(): String {
    return this._postId;
  }

  private readonly _postId: String;
  get email(): String {
    return this._email;
  }

  private readonly _email: String;
  get body(): String {
    return this._body;
  }

  private readonly _body: String;
  get name(): String {
    return this._name;
  }

  private readonly _name: String;
  get id(): number {
    return this._id;
  }

  private readonly _id: number;
  constructor(data: any) {
    this._id = data.id;
    this._name = data.name;
    this._body = data.body;
    this._email = data.email;
    this._postId = data.postId;
  }
}

export default CommentVO;
