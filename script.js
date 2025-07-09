
const dias = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

function criarPainel() {
  const painel = document.getElementById("painel");
  dias.forEach(dia => {
    const coluna = document.createElement("div");
    coluna.className = "bg-gray-800 p-3 rounded shadow border border-gray-700";
    coluna.innerHTML = \`<h2 class="text-yellow-400 font-bold capitalize mb-2">\${dia}</h2>
      <textarea rows="8" class="w-full p-2 bg-black text-white border border-gray-600 rounded" placeholder="Digite suas tarefas..."></textarea>\`;
    painel.appendChild(coluna);
  });
}

function exportarJSON() {
  const data = new Date().toISOString().split("T")[0];
  const semana = {};
  const colunas = document.querySelectorAll("#painel > div");

  dias.forEach((dia, i) => {
    const tarefas = colunas[i].querySelector("textarea").value.trim().split("\n").filter(l => l.trim() !== "");
    semana[dia] = tarefas.map(t => ({ tarefa: t }));
  });

  const blob = new Blob([JSON.stringify({ data, semana }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = \`semana-\${data}.json\`;
  a.click();
}

window.onload = criarPainel;
