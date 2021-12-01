function parseString(type) {
  return typeof type == 'string' ? JSON.parse(type) : type;
}

class SettingsVO {
  static KEYS = {
    IS_AUTO_LOAD_COMMENTS: 'isAutoLoadComments',
    SELECTED_PAGE_INDEX: 'selectedPageIndex'
  }

  constructor(storage) {
    this.storage = storage;
  }

  get selectedPageIndex() {
    return parseString(this.storage.getItem(SettingsVO.KEYS.SELECTED_PAGE_INDEX)) || 0;
  }

  set selectedPageIndex(value) {
    this.storage.setItem(SettingsVO.KEYS.SELECTED_PAGE_INDEX, value);
  }

  get isAutoLoadComments() {
    return parseString(this.storage.getItem(SettingsVO.KEYS.IS_AUTO_LOAD_COMMENTS)) || false;
  }

  set isAutoLoadComments(value) {
    this.storage.setItem(SettingsVO.KEYS.IS_AUTO_LOAD_COMMENTS, value);
  }
}

export default SettingsVO;
