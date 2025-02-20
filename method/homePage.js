const homePage = {
  liTag: function (obj) {
    let url = qs.stringify(list[0]).split("&", 2).join("&");

    return `<li><a href=/${url}>${obj.name}</a></li>`;
  },
};
