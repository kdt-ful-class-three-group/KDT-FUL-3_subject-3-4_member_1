//btnATag에서 사용할 text
import btnText from '../../data/btnATagText.js'
import url from '../controller/url.js'

//json가져오기위한 모듈
import read from '../read.js'
let list = read.readList()

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
   * a태그 만드는 함수
   * @param {string} href - 이동할 경로 
   * @param {content} content - a태그 안에 들어갈 내용 
   * @returns {string} <a href=href>content</a>
   */
  hrefATag : function(href,content){
    return `<a href=${href}>${content}</a>`
  }
  ,
  /**
   * 수정, 삭제 버튼을 위한 a태그
   * @param {string} role - 버튼 역할, 'edit' or 'delete'
   * @param {String} url - id와 date가 있는 req.url
   * @returns {string} <a href='/role/url'>btnText[role]</a>
   */
  btnATag : function(role,url){
    return `<a href=/${role}/${url}>${btnText[role]}</a>`
  }
  ,
  /**
   * a태그가 들어갈 li태그 생성 함수
   * @param {function} callback - aTag안에 들어갈 url메서드
   * @param {object} obj - 객체 데이터
   * @returns {string} a태그가 들어간 li태그 문자열
   */
  liTag : function(callback){
    //`<li>${tag.aTag(callback,obj)}</li>`
    return `<li>${callback}</li>`
  },
  /**
   * 수정 삭제 버튼에 사용되는 a태그를 포함한 li태그
   * @param {string} role = 버튼 역할, 'edit' or 'delete'
   * @param {String} url = id와 date가 있는 req.url
   * @return {string} <li><a href='/role/url'>btnText[role]</a></li>
   */
  btnLiTag : function(role,url){
    return `<li>${btnATag(role,url)}</li>`
  }
  ,
  /**
   * 데이터만큼 만든 li태그 묶음
   * @param {Function} callback - url형식
   * @param {Array} arr - 데이터가 담긴 배열 
   * @returns {string} 데이터만큼 만든 li태그 문자열 묶음
   */

  //[ ] liTags를 재사용하고 싶음
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
  },
  /**
   * 수정, 삭제 버튼을 포함한 ulTag
   * @param {String} url id와 date가 있는 req.url
   * @returns {String} btnAtag가 들어간 li태그를 가진 ul 태그
   */
  btnUlTag : function(url){
    return `<ul>
      ${this.btnLiTag('edit',url)}
      ${this.btnLiTag('delete',url)}
    </ul>`
  }

}

export default tag
console.log(list[0])

console.log(tag.liTag(tag.aTag(url.adminUrl(list[0]),list[0])))