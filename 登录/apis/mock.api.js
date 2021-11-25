import http from '@/configs/request.js';

// get方法调用
export function getWay(params) {
  return http.get('api/test', {
    params,
  });
}

// post方法JSON格式调用
export function postWay(data) {
  return http.post('api/test', data);
}

// post方法form-urlencoded格式调用
export function postWay2(
  data,
  config = {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  }
) {
  return http.post('api/test', data, config);
}
