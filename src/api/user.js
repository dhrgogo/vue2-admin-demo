// eslint-disable-next-line
/* eslint-disable */
import request from '@/utils/request'

export function getUser(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
export function Creat(form) {
  return request({
    url: '/user/create',
    method: 'post',
    data: {
      name:form.name,
      mobile: form.mobile,
      position: form.position,
      gender: form.gender,
      department: form.department,
      email: form.email
    }
  })
}
export function Update(form) {
  return request({
    url: '/user/update/'+form.id+'',
    method: 'put',
    data: {
      name:form.name,
      mobile: form.mobile,
      position: form.position,
      gender: form.gender,
      department: form.department,
      email: form.email
    }
  })
}
export function getDepartment(form) {
  return request({
    url: '/department/list',
    method: 'get'
  })
}
