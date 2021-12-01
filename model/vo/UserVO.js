class UserVO {
  constructor(data) {
    this.name = data.name;
    this.username = data.username;
    this.id = data.id;
    this.phone = data.phone;
    this.website = data.website;
    this.address = { ...data.address };
    this.company = { ...data.company };
  }
}

export default UserVO;
