const ajax = new XMLHttpRequest();
const newsUrl = "https://api.hnpwa.com/v0/news/1.json";

ajax.open("GET", newsUrl, false);
ajax.send();

// response 객체로 바꾸는 코드
const news = JSON.parse(ajax.response);
const ul = document.createElement("ul");

for (let i = 0; i < news.length; i++) {
  //   let li = document.createElement(`<li>${newsFeed[i].title}</li>`);
  const li = document.createElement("li");
  li.innerHTML = news[i].title;
  ul.appendChild(li);
}

document.getElementById("root").appendChild(ul);
