import http from '@/configs/request.js';

export function getOpenidByCode(data) {
  return http.post('http://localhost:3000/login', data, {
    custom: {
      isShowToast: false,
    },
  });
}
