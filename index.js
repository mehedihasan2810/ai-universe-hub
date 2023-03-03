let finalData = null;
let isSeeMore = false;
async function fetchData() {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    showLoader(true);
    const response = await fetch(URL);
    const datas = await response.json();
    showLoader(false);
    console.log(datas.data.tools);

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

async function showModal(id) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const singleData = await response.json();

  console.log(singleData);

  const modal = `
  <input type="checkbox" id="${id}" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative max-w-[600px] lg:max-w-[1200px]">
      <div class="flex gap-4 flex-col lg:flex-row">
        <div class="flex-1 bg-red-100 border border-red-600 rounded-lg p-8">
          <h2 class="text-2xl font-bold mb-6">
            helloooooooooooo
          </h2>

          <div class="flex justify-between mb-6">
            <div
              class="w-min bg-white rounded-md p-6 text-xl font-bold text-green-600"
            >
              $10/ month Basic
            </div>
            <div
              class="w-min bg-white rounded-md p-6 text-xl font-bold text-pink-600"
            >
              $10/ month Basic
            </div>
            <div
              class="w-min bg-white rounded-md p-6 text-xl font-bold text-blue-600"
            >
              $10/ month Basic
            </div>
          </div>

          <div class="flex justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-3">Features</h2>
              <ul class="list-disc list-inside">
                <li>fooooooooooo</li>
                <li>Customizable responses</li>
                <li>Customizable responses</li>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-3">Integrations</h2>
              <ul class="list-disc list-inside">
                <li>Customizable responses</li>
                <li>Customizable responses</li>
                <li>Customizable responses</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex-1 p-6 shadow rounded-md">
          <div class="relative">
            <img
              class="rounded-md mb-4"
              src=""
              alt=""
            />
            <div
              class="absolute top-2 right-2 bg-red-400 p-2 text-white rounded-md"
            >
              94% accuracy
            </div>
          </div>

          <h2 class="text-2xl font-bold mb-2">
            Hi, how are you doing today?
          </h2>
          <p>
            I'm doing well, thank you for asking. How can I assist you today?
          </p>
        </div>
      </div>

      <div class="modal-action">
        <label
          for="${id}"
          class="grid place-items-center text-xl text-red-600 bg-red-100 w-12 h-12 rounded-full absolute top-0 right-0"
          ><i class="fa-solid fa-xmark"></i
        ></label>
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
    <label id="${tool.name}" for="${tool.id}" class="bg-red-100 w-10 h-10 rounded-full object-contain text-red-600 hover:scale-95 grid place-items-center" onclick="showModal('${tool.id}')" ><i class="fa-solid fa-arrow-right"></i></label>
  </div>
  </div>
     `;
    container.append(card);
    // document.getElementById(tool.name).onclick = function(){showModal(tool)};
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
