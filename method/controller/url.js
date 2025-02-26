import qs from 'querystring'

//url에선 id와 date만 사용함
const url = {
  /**
   * 객체를 문자열로 바꾼 후 id와 date를 가져오는 함수
   * @param {object} obj {id:'111111',date='20250101',...}
   * @return {string} id=111111&date=20250101
   */
  makeUrl : function(obj){
    //&로 나눈 배열에서 앞순서 2개 가져온 후 요소 사이에 &붙여 문자열로 반환
    return qs.stringify(obj).split('&',2).join('&')
  },
  /**
   * admin로 접근했을 때 url에 적용할 함수
   * @param {object} obj {id:'111111',date='20250101',...}
   * @return {string} admin/id=111111&date='250101' 
   */
  adminUrl : function(obj){
    return `admin/${url.makeUrl(obj)}`
  }
}

export default url