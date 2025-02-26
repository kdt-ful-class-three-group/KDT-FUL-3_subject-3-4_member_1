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
   * a태그가 들어갈 li태그 생성 함수
   * @param {function} callback - aTag안에 들어갈 url메서드
   * @param {object} obj - 객체 데이터
   * @returns {string} a태그가 들어간 li태그 문자열
   */
  liTag : function(callback,obj){
    return `<li>${tag.aTag(callback,obj)}</li>`
  },
  /**
   * 
   * @param {*} obj 
   * @returns 
   */
  liTags : function(callback,arr){
    return arr.reduce((acc,obj)=>acc+tag.liTag(callback,obj),"")
  }
  ,
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

let test = list.reduce((acc,i)=> acc + tag.liTag(url.makeUrl(i),i),"")
console.log(test)

let testTwo = tag.liTags(url.makeUrl,list)
console.log(testTwo)