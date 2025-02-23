const add = {
  randomId: function() {
    return `
    let id = document.getElementsByTagName('input')[0]
    id.value = Math.floor(Math.random()*899999)+100000;
  `
  },
  alert: function(){
    return `alert("'2025MMDD'의 형식을 지켜주세요")`
  }
}