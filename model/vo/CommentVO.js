class CommentVO {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.body = data.body;
    this.email = data.email;
    this.postId = data.postId;
  }
}

export default CommentVO;
