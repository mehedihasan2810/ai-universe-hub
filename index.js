async function fetchData() {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  const response = await fetch(URL);
  const datas = await response.json();
  displayData(datas);
}

function displayData(datas) {
  const aiTools = datas.data.tools;
  console.log(aiTools);
  const container = document.getElementById("container");

  aiTools.forEach((tool) => {
    const card = document.createElement("div");
    card.className = "max-w-[480px] p-6 shadow rounded-md";
    card.innerHTML = `
    <img
    class="object-cover rounded"
    src="https://images.unsplash.com/photo-1675557009875-436f71457475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    alt="chatgpt"
  />

  <div class="mt-4">
    <h2 class="text-2xl font-bold text-slate-700 mb-3">Features</h2>
    <ol class="list-decimal list-inside">
      <li class="text-slate-500">Natural language processing</li>
      <li class="text-slate-500">Natural language processing</li>
      <li class="text-slate-500">Natural language processing</li>
    </ol>
    <hr class="my-6" />
    <h2 class="text-2xl font-bold mb-4 text-slate-700">ChatGPT</h2>
    <div class="flex gap-2">
      <img
        class="w-5 h-5 object-contain"
        src="./icons/calender.svg"
        alt=""
      />
      <p>11/11/2023</p>
    </div>
  </div>
     `;
    container.append(card);
  });
}

fetchData();
