class UserVO {
  get company(): any {
    return this._company;
  }

  get address(): any {
    return this._address;
  }

  get website(): String {
    return this._website;
  }

  get email(): String {
    return this._email;
  }

  get phone(): String {
    return this._phone;
  }

  get id(): Number {
    return this._id;
  }

  get username(): String {
    return this._username;
  }

  get name(): String {
    return this._name;
  }

  private readonly _company: any;
  private readonly _address: any;
  private readonly _email: String;
  private readonly _website: String;
  private readonly _phone: String;
  private readonly _id: Number;
  private readonly _name: String;
  private readonly _username: String;

  constructor(data: any) {
    this._name = data.name;
    this._username = data.username;
    this._id = data.id;
    this._phone = data.phone;
    this._email = data.email;
    this._website = data.website;
    this._address = { ...data.address };
    this._company = { ...data.company };
  }
}

export default UserVO;
