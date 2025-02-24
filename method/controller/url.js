//url에선 id와 date만 사용함
const url = {
  /**
   * 문자열로 바뀐 객체에서 id와 date를 가져오는 함수
   * @return {string} id=111111&date='20250101'
   */
  makeUrl : function(dataString){
    //&로 나눈 배열에서 앞순서 2개 가져온 후 요소 사이에 &붙여 문자열로 반환
    return dataString.split('&',2).join('&')
  },
  /**
   * admin로 접근했을 때 url에 적용할 함수
   * @return {string} admin/id=111111&date='250101' 
   */
  adminUrl : function(dataString){
    return `admin/${url.makeUrl(dataString)}`
  }
}