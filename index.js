async function fetchData(isSeeMore = false) {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    showLoader(true);
    const response = await fetch(URL);
    const datas = await response.json();
    showLoader(false);
    console.log(datas.status);

    if (!datas.status || !datas.data.tools.length) {
      showErrorMessage();
    }

    let finalData;
    if (isSeeMore) {
      finalData = datas.data.tools;
    } else {
      let tools = datas.data.tools;
      finalData = tools.length > 6 ? tools.slice(0, 6) : tools;
      console.log(finalData);
    }
    displayData(finalData);
  } catch (error) {
    showErrorMessage();
    console.log(error);
  }
}

function displayData(datas) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  console.log(datas[0]);

  datas.forEach((tool) => {
    const card = document.createElement("div");
    card.className = "max-w-[480px] p-6 shadow rounded-md";
    card.innerHTML = `
    <img
    class="object-cover rounded"
    src="${tool.image}"
    alt="chatgpt"
  />
  <div class="mt-4">
    <h2 class="text-2xl font-bold text-slate-700 mb-3">Features</h2>
    <ol class="list-decimal list-inside">
      <li class="text-slate-500">${tool.features[0]}</li>
      <li class="text-slate-500">${tool.features[1]}</li>
      <li class="text-slate-500">${tool.features[2]}</li>
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
    <button class="bg-red-100 w-10 h-10 rounded-full object-contain text-red-600 hover:scale-95"><i class="fa-solid fa-arrow-right"></i></button>
  </div>
  </div>
     `;
    container.append(card);
  });
}

const showMore = (function () {
  let isSeeMore = false;
  return function () {
    isSeeMore = !isSeeMore;
    if (isSeeMore) {
      btnSeeMore.innerHTML = "SEE LESS";
    } else {
      btnSeeMore.innerHTML = "SEE MORE";
    }
    fetchData(isSeeMore);
  };
})();

const btnSeeMore = document.getElementById("btn-see-more");
btnSeeMore.addEventListener("click", showMore);

const spinnerContainer = document.getElementById("spinner-container");
const spinner = document.getElementById("spinner");

function showLoader(isLoading) {
  if (isLoading) {
    spinnerContainer.classList.remove("hidden");
    spinner.classList.remove("animate-none");
  } else {
    spinnerContainer.classList.add("hidden");
    spinner.classList.add("animate-none");
  }
}

function showErrorMessage() {
  btnSeeMore.classList.add("hidden");
  const main = document.querySelector("main");
  if (main.querySelector("#show-message")) {
    return;
  }
  const h1 = document.createElement("h1");
  h1.id = "show-message";
  h1.className = "text-center text-red-600 text-4xl";
  h1.innerText = "No Data Found!";
  main.append(h1);
}

fetchData();
