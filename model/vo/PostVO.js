class PostVO {
  constructor(postData, userData, comments = []) {
    this.post = postData;
    this.user = userData;
    this.comments = comments;
  }
}

export default PostVO;
