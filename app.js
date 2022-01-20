const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);

  const newsList = [];

  newsList.push("<ul>");

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li>
        <a href="#/show/${newsFeed[i].id}">${i + 1}.${newsFeed[i].title} - ${
      newsFeed[i].comments_count
    }</a> 
    </li>
  `);
  }

  newsList.push(`</ul>`);
  newsList.push(`
    <div>
        <a href="#/page/${
          store.currentPage > 1 ? store.currentPage - 1 : store.currentPage
        }">Previous</a>
        <a href="#/page/${
          store.currentPage < 3 ? store.currentPage + 1 : store.currentPage
        }">Next</a>
    </div>
  `);

  container.innerHTML = newsList.join("");
}

function newsDetail() {
  // 주소
  const id = location.hash.substring(7);
  console.log(id);
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  // 목록 삭제하기
  container.innerHTML = "";

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
    <a href="#/page/${store.currentPage}">Back To List</a>
    </div>
    `;
}

function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
    // index of returns 0 or -1
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else newsDetail();
}

window.addEventListener("hashchange", router);

router();
