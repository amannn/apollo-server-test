import request from 'request-promise';

const FortuneCookie = {
  getOne() {
    return request('http://fortunecookieapi.com/v1/cookie')
      .then(res => JSON.parse(res))
      .then(res => res[0].fortune.message);
  }
};

export { FortuneCookie };
