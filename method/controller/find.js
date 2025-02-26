//qs.parse를 하기위한 모듈
import qs from 'querystring'
//경로에 따라 잘라낼 url의 길이를 찾는 모듈
import urlSlice from '../../data/urlSlice.js'

const find = {
  /**
   * 
   * @param {String} url - id와 name이 있는 req.url
   * @param {String} urlRole - 'url' or 'edit' or 'admit' or 'delete'
   * @returns {Object} - id와 date를 가진 객체
   */
  urlToObj : function(url,urlRole){
    return qs.parse(url.slice(urlSlice[urlRole]))
  },
  filter : function(arr){
    return arr.filter(i=> (i.id === find.urlToObj.id)&&(i.date===find.urlToObj.date))[0]
  }
}