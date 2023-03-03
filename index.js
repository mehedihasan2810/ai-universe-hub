let finalData = null;
let isSeeMore = false;
async function fetchData() {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    showLoader(true);
    const response = await fetch(URL);
    const datas = await response.json();
    showLoader(false);
    console.log(datas.data.tools[0]);

    if (!datas.status || !datas.data.tools.length) {
      showErrorMessage();
    }

    finalData = datas.data.tools.slice();
    slicedData =
      finalData.length > 6 ? finalData.slice(0, 6) : finalData.slice();
    displayData(slicedData);
  } catch (error) {
    showErrorMessage();
    console.log(error);
  }
}

const script = document.querySelector("script[src]");
console.log(script);

const modalContainer = document.getElementById("modal-container");

function showModal(id) {
  const modal = `
<input type="checkbox" id="${id}" class="modal-toggle"/>
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div class="modal-action">
      <label for="${id}" class="btn">Yay!</label>
    </div>
  </div>
</div>
`;

  modalContainer.innerHTML = modal;
}

const container = document.getElementById("container");
function displayData(datas) {
  container.innerHTML = "";

  datas.forEach((tool) => {
    const card = document.createElement("div");
    card.className = "max-w-[480px] p-6 shadow rounded-md";

    const features = tool.features
      .map((feature) => `<li class="text-slate-500">${feature}</li>`)
      .join("");

    card.innerHTML = `
    <img
    class="object-cover rounded"
    src="${tool.image}"
    alt="chatgpt"
  />
  <div class="mt-4">
    <h2 class="text-2xl font-bold text-slate-700 mb-3">Features</h2>
    <ol class="list-decimal list-inside">
     ${features}
    </ol>
    <hr class="my-6" />
    <div class="flex justify-between items-center">
    <div>
    <h2 class="text-2xl font-bold mb-4 text-slate-700">${tool.name}</h2>
    <div class="flex gap-2">
      <img
        class="w-5 h-5 object-contain"
        src="./icons/calender.svg"
        alt=""
      />
      <p>${tool.published_in}</p>
    </div>
    </div>
    <label onclick="showModal('${tool.id}')" for="${tool.id}" class="bg-red-100 w-10 h-10 rounded-full object-contain text-red-600 hover:scale-95 grid place-items-center"><i class="fa-solid fa-arrow-right"></i></label>
  </div>
  </div>
     `;
    container.append(card);
  });
}

function showMore() {
  isSeeMore = !isSeeMore;
  if (isSeeMore) {
    btnSeeMore.innerHTML = "SEE LESS";
    displayData(finalData);
  } else {
    btnSeeMore.innerHTML = "SEE MORE";
    slicedData = finalData.length > 6 ? finalData.slice(0, 6) : finalData;
    displayData(slicedData);
  }
}

const btnSortByDate = document.getElementById("btn-sort-by-date");
const btnSeeMore = document.getElementById("btn-see-more");
btnSeeMore.addEventListener("click", showMore);

function showErrorMessage() {
  btnSeeMore.classList.add("hidden");
  const main = document.querySelector("main");
  const h1 = main.querySelector("#show-message");
  h1.classList.remove("hidden");
  btnSortByDate.classList.add("hidden");
}

btnSortByDate.addEventListener("click", sortData);

function sortData() {
  const sortedData = finalData.sort((dataA, dataB) => {
    const publishedA = new Date(dataA.published_in).getTime();
    const publishedB = new Date(dataB.published_in).getTime();
    if (publishedA < publishedB) return 1;
    if (publishedA > publishedB) return -1;
    if (publishedA === publishedB) return 0;
  });

  if (isSeeMore) {
    btnSeeMore.innerHTML = "SEE LESS";
    displayData(sortedData);
  } else {
    btnSeeMore.innerHTML = "SEE MORE";
    slicedData = sortedData.length > 6 ? sortedData.slice(0, 6) : sortedData;
    displayData(slicedData);
  }
}

const spinnerContainer = document.getElementById("spinner-container");
const spinner = document.getElementById("spinner");

function showLoader(isLoading) {
  if (isLoading) {
    spinnerContainer.classList.remove("hidden");
    spinner.classList.remove("animate-none");
    document.body.classList.add("overflow-hidden");
    btnSeeMore.classList.add("hidden");
    btnSortByDate.classList.add("hidden");
  } else {
    spinnerContainer.classList.add("hidden");
    spinner.classList.add("animate-none");
    document.body.classList.remove("overflow-hidden");
    btnSeeMore.classList.remove("hidden");
    btnSortByDate.classList.remove("hidden");
  }
}

fetchData();
