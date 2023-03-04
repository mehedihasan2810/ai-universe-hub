let finalData = [];
let finalSingleData = [];
let isSeeMore = false;

// fetching data
async function fetchData() {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    showLoader(true);
    const response = await fetch(URL);
    const datas = await response.json();
    const singleMapedData = datas.data.tools.map((tool) => {
      return fetch(
        `https://openapi.programming-hero.com/api/ai/tool/${tool.id}`
      );
    });
    const responseSingleData = await Promise.all(singleMapedData);
    const singleData = await Promise.all(
      responseSingleData.map((r) => r.json())
    );
    finalSingleData = singleData.slice();
    showLoader(false);

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
const modalContainer = document.getElementById("modal-container");

// showing modal
async function showModal(id) {
  const data = finalSingleData.find((item) => item.data.id === id).data;
  const pricing = data.pricing;
  const integrations = data.integrations
    ? data.integrations.map((integration) => `<li>${integration}</li>`).join("")
    : "No Data Found!";
  const accuracy = data.accuracy.score;
  const showAccuracy = accuracy
    ? `<div
  class="absolute top-2 right-2 bg-red-400 p-2 text-white rounded-md"
>
  ${accuracy * 100}% accuracy
</div>`
    : "";
  const examples = data.input_output_examples;
  const input = examples ? examples[0].input : "Can you give any example?";
  const output = examples ? examples[0].output : "No! Not Yet! Take a break!!!";

  const modal = `
  <input type="checkbox" id="${id}" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative max-w-[600px] lg:max-w-[1200px]">
      <div class="flex gap-4 flex-col lg:flex-row">
        <div class="flex-1 bg-red-100 border border-red-600 rounded-lg p-8">
          <h2 class="text-2xl font-bold mb-6">
            ${data.description}
          </h2>

          <div class="flex flex-col sm:flex-row gap-2 sm:justify-between mb-6">
            <div
              class="lg:w-min bg-white rounded-md p-6 text-xl font-bold text-green-600"
            >
              ${
                pricing
                  ? pricing[0].price + " " + pricing[0].plan
                  : "Free of " + "Cost/ " + "Basic"
              }
            </div>
            <div
              class="lg:w-min bg-white rounded-md p-6 text-xl font-bold text-pink-600"
            >
            ${
              pricing
                ? pricing[1].price + " " + pricing[1].plan
                : "Free of " + "Cost/ " + "Pro"
            }
            </div>
            <div
              class="lg:w-min bg-white rounded-md p-6 text-xl font-bold text-blue-600"
            >
            ${
              pricing
                ? pricing[2].price + " " + pricing[2].plan
                : "Free of " + "Cost/ " + "Enterprise"
            }
            </div>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-3">Features</h2>
              <ul class="list-disc list-inside">
                <li>${data.features[1].feature_name}</li>
                <li>${data.features[2].feature_name}</li>
                <li>${data.features[3].feature_name}</li>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-3">Integrations</h2>
              <ul class="list-disc list-inside">
                ${integrations}
              </ul>
            </div>
          </div>
        </div>

        <div class="flex-1 p-6 shadow rounded-md">
          <div class="relative">
            <img
              class="rounded-md mb-4"
              src="${data.image_link[0]}"
              alt=""
            />
            ${showAccuracy}
            
          </div>

          <h2 class="text-2xl font-bold mb-2">
            ${input}
          </h2>
          <p>
            ${output}
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

// displaying data
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
  });
}

// show more and show less functionality
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

// show error message
function showErrorMessage() {
  btnSeeMore.classList.add("hidden");
  const main = document.querySelector("main");
  const h1 = main.querySelector("#show-message");
  h1.classList.remove("hidden");
  btnSortByDate.classList.add("hidden");
}

btnSortByDate.addEventListener("click", sortData);

// data sorting functionality
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

// show loader
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
