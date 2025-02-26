//list.json을 가져와 데이터로
import read from '../read.js'
import url from '../controller/url.js'

//list.json을 가져와 배열로 변환
let list = read.readList()
console.log(list)

const tag = {
  /**
   * href경로와 content로 a태그 생성
   * @param {function} callback - url의 메서드
   * @param {object} obj - 객체 데이터
   * @returns {string} a태그 문자열
   */
  aTag : function(callback,obj){
    return `<a href=/${callback}>${obj.name}</a>`
  },
  /**
   * 
   * @param {string} href - 이동할 경로 
   * @param {content} content - a태그 안에 들어갈 내용 
   * @returns {string} <a href=href>content</a>
   */
  hrefATag : function(href,content){
    return `<a href=${href}>${content}</a>`
  }
  ,
  /**
   * a태그가 들어갈 li태그 생성 함수
   * @param {function} callback - aTag안에 들어갈 url메서드
   * @param {object} obj - 객체 데이터
   * @returns {string} a태그가 들어간 li태그 문자열
   */
  liTag : function(callback,obj){
    return `<li>${tag.aTag(callback,obj)}</li>`
  },
  /**
   * 데이터만큼 만든 li태그 묶음
   * @param {Function} callback - url형식
   * @param {Array} arr - 데이터가 담긴 배열 
   * @returns {string} 데이터만큼 만든 li태그 문자열 묶음
   */
  liTags : function(callback,arr){
    return arr.reduce((acc,obj)=>acc+tag.liTag(callback(obj),obj),"")
  }
  ,
  /**
   * li태그문자열이 들어간 ul태그
   * @param {Function} callback - url형식
   * @param {Array} arr - 데이터가 담긴 배열
   * @returns {string} a태그가 들어간 li태그를 가진 ul태그
   */
  ulTag : function(callback,arr){
    return `<ul>${tag.liTags(callback,arr)}</ul>`
  }
}

export default tag