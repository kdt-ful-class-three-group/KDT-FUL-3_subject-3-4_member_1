//script안에 input.value를 지정하기 위해 값을 찾는 모듈
import find from '../controller/find.js'

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
  },
  /**
   * 데이터 형식이 잘못되었을 때 html문자열에 추가할 경고창
   * @returns {String} alert창을 띄우는 스크립트
   */
  alert : function(){
    return `alert("'2025MMDD'의 형식을 지켜주세요")`
  },
  /**
   * 
   */
  edit : function(arr,url){
    return `
      let input = document.getElementsByTagName('input');
      let content = document.getElementsByTagName('textarea')[0]
      input[0].value = ${find.filter(arr,url,'edit').id}
      input[1].value = '${find.filter(arr,url,'edit').date}'
      input[2].value = '${find.filter(arr,url,'edit').name}'
      content.value = '${find.filter(arr,url,'edit').content}'
      `
  }
}