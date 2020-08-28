const $keyword = document.querySelector(".keyword");
const $keywords = document.querySelector(".keywords");
const $searchResults = document.querySelector(".search-results");

const SHOWING = "showing";
const HIGHL = "highlight"
let rec = [] 
let highlight = -1;

function keywordEnter(value){
  fetch(
    `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${value}`
  )
    .then((res) => res.json())
    .then((results) => {
      if (results.data) {
        $searchResults.innerHTML = results.data
          .map((cat) => `<article><img src="${cat.url}" /></article>`)
          .join("");
      }
    });
}

$keywords.addEventListener("click", (e) => {
  const value  = e.target.innerHTML;
  keywordEnter(value);
  $keywords.classList.remove(SHOWING);
});

$keyword.addEventListener("keyup", (e) => {
  const { value } = e.target; /* 검색어 전체 */
  const { key } = e; /* 현재 누른 키 값 */ 

  if (highlight > -1) {
    $keywords.querySelectorAll("li")[highlight].classList.remove(HIGHL);
  }
  if (key === "ArrowDown" || key === "ArrowUp"){
    if (key === "ArrowDown" && rec.length-1 > highlight){ 
      highlight += 1; 
    }
    else if (key === "ArrowUp" && 0 < highlight) { 
      highlight -= 1; 
    }
    $keywords.querySelectorAll("li")[highlight].classList.add(HIGHL);
  }
  else {
    while ( $keywords.hasChildNodes() ) { 
      $keywords.removeChild($keywords.firstChild); 
    }
    if (value && !(key === "Escape" || key === "Enter")){
      fetch(`https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`)
      .then(function (response){
        return response.json();
      }).then(function (json){
        const ul = document.createElement("ul");
        for (var item in json){
          const li = document.createElement("li");
          const span = document.createElement("span");
          span.innerText = json[item];
          li.appendChild(span);
          ul.appendChild(li);
        }
        $keywords.classList.add(SHOWING);
        $keywords.appendChild(ul);
        rec = Object.keys(json).map((key) => [json[key]]);
      }).catch(function (error){
        console.log(error);
      });
    } else {
      $keywords.classList.remove(SHOWING);
    }
  }

  if (key === "Enter") {
    keywordEnter(value);
  }
});
