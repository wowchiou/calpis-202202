export const getBrowserVersion = () => {
  return {
    versions: (function () {
      const u = window.navigator.userAgent;
      return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        webApp: u.indexOf('Safari') == -1,
        fbapp: u.indexOf('FBAV') > -1 || u.indexOf('FBAN') > -1,
        line: u.indexOf('Line') > -1,
        instagram: u.indexOf('Instagram') > -1,
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      };
    })(),
    language: (
      window.navigator.browserLanguage || window.navigator.language
    ).toLowerCase(),
  };
};

export const copyValue = (val, ios) => {
  let input = document.createElement('input');
  input.setAttribute('value', val);
  document.body.appendChild(input);
  if (ios) {
    const editable = input.contentEditable;
    const readOnly = input.readOnly;
    input.contentEditable = true;
    input.readOnly = true;
    const range = document.createRange();
    range.selectNodeContents(input);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    input.setSelectionRange(0, 999999);
    input.contentEditable = editable;
    input.readOnly = readOnly;
  } else {
    input.select();
  }
  if (document.execCommand('copy')) {
    document.execCommand('copy', false, null);
    document.body.removeChild(input);
    return true;
  }
  document.body.removeChild(input);
  return false;
};

export const StopBodyScroll = (function () {
  let instance = null;
  function StopBodyScroll() {
    this.pageTop = 0;
    this.body = document.body;
    this.html = document.querySelector('html');
  }
  StopBodyScroll.prototype.fixedBody = function () {
    this.pageTop = window.scrollY;
    this.html.style.height = window.screen.availHeight + 'px';
    this.body.style.position = 'fixed';
    this.body.style.top = -this.pageTop + 'px';
  };
  StopBodyScroll.prototype.scrollBody = function () {
    this.html.style.height = 'auto';
    this.body.style.position = '';
    this.body.style.top = '';
    window.scrollTo(0, this.pageTop);
  };
  return function () {
    if (!instance) {
      instance = new StopBodyScroll();
    }
    return instance;
  };
})();
