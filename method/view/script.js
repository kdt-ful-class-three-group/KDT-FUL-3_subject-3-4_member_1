const scriptInHtml = {
  /**
   * 데이터를 제출할 때 id에 6자리 랜덤 숫자 배정
   * @returns {String} id를 입력하는 입력창에 6자리 랜덤 숫자 배정하는 스크립트
   */
  randomId : function(){
    return `
    let id = document.getElementsByTagName('input')[0]
    id.value = Math.floor(Math.random()*899999)+100000;
  `
  }
}