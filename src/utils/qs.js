export function getQueryString(url, params = {}) {
  const arr = [];
  Object.keys(params).forEach((key) => {
    arr.push(`${key}=${encodeURIComponent(params[key])}`);
  });
  return arr.length > 0 ? `${url}${/\?/.test(url) ? '&' : '?'}${arr.join('&')}` : url;
}

export function getParams(source) {
  const str = source.replace(/^\?/, '');
  return str.split('&').reduce((result, item) => {
    const [key, value] = item.split('=');
    // eslint-disable-next-line no-param-reassign
    result[key] = decodeURIComponent(value);
    return result;
  }, {});
}
