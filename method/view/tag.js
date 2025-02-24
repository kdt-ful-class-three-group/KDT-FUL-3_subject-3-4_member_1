//list.json을 가져와 데이터로
import read from '../read.js'

const tag = {
  /**
   * href경로와 content로 a태그 생성
   * @param {string} url - '/'제외한 url 
   * @param {string} name - 데이터에서 name 
   * @returns {string} a태그 문자열
   */
  aTag : function(url,name){
    return `<a href=/${url}>${name}</a>`
  },
  /**
   * a태그가 들어갈 li태그 생성 함수
   * @param {string} url - aTag안에 들어갈 url
   * @param {string} name - aTag에 사용될 content
   * @returns {string} a태그가 들어간 li태그 문자열
   */
  liTag : function(url, name){
    return `<li>${tag.aTag(url,name)}</li>`
  },
  /**
   * ul태그 생성함수
   * @param {Array} dataArr - 데이터가 담긴 배열
   * @param {string} url - aTag안에 들어간 url
   * @param {string} name - aTag에 사용될 content
   * @returns {string} a태그가 들어간 li태그를 가진 ul태그
   */
  ulTag : function(url,name,dataArr){
    

  }
}