async function fetchData() {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  const response = await fetch(URL);
  const datas = await response.json();
  displayData(datas);
}

function displayData(datas) {
  const aiTools = datas.data.tools;
  console.log(aiTools[0]);
  const container = document.getElementById("container");

  aiTools.forEach((tool) => {
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

fetchData();
