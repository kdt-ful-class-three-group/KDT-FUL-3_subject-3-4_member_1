//json가져오기위한 모듈
import read from '../read.js'
//json파일 유무 확인을 위한 모듈
import exist from '../controller/existJson.js'
//tag모듈
import tag from './tag.js'
//htmlString모듈
import htmlString from '../view/htmlString.js'
//test하기 위해 url 모듈 가져옴
import url from '../controller/url.js'
//detail에서 url정하기 위한 모듈
import find from '../controller/find.js'
//script에 작성할 모듈
import script from './script.js'

const html = {
  /**
   * '/' 경로에 따른 홈페이지
   * @param {Boolean} isAdmin - admin이면 true, 아니면 false 
   * @returns {String} 홈페이지 문자열
   */
  home : function(isAdmin){

    //isAdmin에 따라 aTag유무 결정
    let addATag = isAdmin?tag.hrefATag('/add','추가'):''
    let urlFunc = isAdmin?url.adminUrl:url.makeUrl

    //json파일 존재하는지 확인 후 없으면 생성
    exist.check()
    
    return htmlString.homeHtml(addATag,tag.ulTag(urlFunc,read.readList()))
  },
  /**
   * 추가 버튼 눌렀을 때 html문자열
   * @returns {String} form태그가 들어간 html 문자열
   */
  add : function(){
    return htmlString.formHtml('add',script.randomId())
  },
  /**
   * 데이터 유효성 검사에 의해 alert이 나오는 html문자열열
   * @returns {String} script에 alert이 들어간 html문자열
   */
  alertAdd : function(){
    return htmlString.formHtml('add',script.alert(),script.randomId())
  },
  /**
   * 수정 버튼 눌렀을 때 필요한 html문자열
   * @param {Array} arr 배열로 된 데이터
   * @param {string} url id와 date가 있는 문자열
   * @returns {string} edit페이지에 필요한 html문자열
   */
  edit : function(arr,url){
    return htmlString.formHtml('edit',script.edit(arr,url))
  }
  ,
  /**
   * 목록을 클릭했을 때 필요한 html문자열
   * @param {Array} arr 배열로 된 데이터
   * @param {String} url id와 date가 있는 문자열 
   * @param {Boolean} isAdmin admin경로인지 말하는 불리언값
   * @returns {string} detail페이지에 필요한 html문자열 
   */
  detail : function(arr,url,isAdmin){
    let obj = find.detailFilter(arr,url,isAdmin)
    return htmlString.detailHtml(obj)
  }
}

export default html