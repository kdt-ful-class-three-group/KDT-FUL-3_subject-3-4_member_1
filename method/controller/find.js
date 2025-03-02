//qs.parse를 하기위한 모듈
import qs from 'querystring'
//경로에 따라 잘라낼 url의 길이를 찾는 모듈
import urlSlice from '../../data/urlSlice.js'
//detail의 btnTag를 위한 모듈
import tag from '../view/tag.js'

const find = {
  /**
   * url을 객체로 변환하는 함수
   * @param {String} url - id와 name이 있는 req.url
   * @param {String} urlRole - 'url' or 'edit' or 'admit' or 'delete'
   * @returns {Object} id와 date를 가진 객체
   */
  urlToObj : function(url,urlRole){
    return qs.parse(url.slice(urlSlice[urlRole]))
  },
  /**
   * url의 id와 date가 list.json에 있는지 확인하는 함수
   * @param {Array} arr - 배열로 된 데이터 
   * @param {String} url - id와 name이 있는 req.url
   * @param {String} urlRole -'url' or 'edit' or 'admit' or 'delete'
   * @returns {Object} id와 date가 일치하는 배열의 요소
   */
  filter : function(arr,url,urlRole){
    return arr.filter(i=> (i.id === find.urlToObj(url,urlRole).id)&&(i.date===find.urlToObj(url,urlRole).date))[0]
  },
  /**
   * 
   * @param {Array} arr - 배열로 된 데이터 
   * @param {String} url - id와 name이 있는 req.url 
   * @param {boolean} isAdmin - admin경로인지 true, false 
   * @returns {object} html문자열에 들어갈 데이터가 답긴 data, btn문자열의 유무가 담긴 isBtn을 키로 가진 객체
   */
  detailFilter : function(arr,url,isAdmin){
    let obj = {}
    if(isAdmin){
      obj = {
        data : find.filter(arr,url,'admin'),
        btn : tag.btnSectionTag(url),
        url : 'admin'
      }
    } else {
      obj = {
        data:find.filter(arr,url,'url'),
        btn : '',
        url : ''
      }
    }
    return obj
  }
}

export default find