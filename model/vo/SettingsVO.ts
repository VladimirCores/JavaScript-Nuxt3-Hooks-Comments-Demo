function parseString(type: any) {
  return typeof type === 'string' ? JSON.parse(type) : type;
}

class SettingsVO {
  static KEYS = {
    IS_AUTO_LOAD_COMMENTS: 'isAutoLoadComments',
    SELECTED_PAGE_INDEX: 'selectedPageIndex',
  };

  get selectedPageIndex() {
    return parseInt(localStorage.getItem(SettingsVO.KEYS.SELECTED_PAGE_INDEX)!) || 0;
  }

  set selectedPageIndex(value: any) {
    localStorage.setItem(SettingsVO.KEYS.SELECTED_PAGE_INDEX, value.toString());
  }

  get isAutoLoadComments() {
    return parseString(localStorage.getItem(SettingsVO.KEYS.IS_AUTO_LOAD_COMMENTS)) || false;
  }

  set isAutoLoadComments(value) {
    localStorage.setItem(SettingsVO.KEYS.IS_AUTO_LOAD_COMMENTS, value);
  }
}

export default SettingsVO;
