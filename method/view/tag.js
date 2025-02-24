const tag = {
  /**
   * href경로와 content로 a태그 생성
   * @param {string} url - '/'제외한 url 
   * @param {string} name - 데이터에서 name 
   * @returns 
   */
  aTag : function(url,name){
    return `<a href=/${url}>${name}</a>`
  },
  /**
   * li태그 생성 함수
   * @param {string} content - li태그 안에 작성할 content
   */
  liTag : function(content){
    return `<li>${content}</li>`
  },
  /**
   * ul태그 생성함수
   * @param {Array} dataArr - 데이터가 담긴 배열
   */
  ulTag : function(dataArr){

    
    return `<ul>${content}</ul>`

  }
}