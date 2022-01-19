const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const COMMENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

// response 객체로 바꾸는 코드
const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  // 주소
  const id = location.hash.substring(1);

  ajax.open("GET", COMMENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;
  content.appendChild(title);
});

for (let i = 0; i < newsFeed.length; i++) {
  const a = document.createElement("a");
  const li = document.createElement("li");
  const comment = newsFeed[i].comments_count;
  const title = newsFeed[i].title;

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${title} - ${comment}`;

  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);
