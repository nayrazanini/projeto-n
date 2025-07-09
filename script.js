const dias = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

function criarPainel() {
  const painel = document.getElementById("painel");
  if (!painel) {
    console.error("Elemento #painel não encontrado no HTML.");
    return;
  }
  painel.innerHTML = ""; // limpa o painel antes de adicionar novamente
  dias.forEach(dia => {
    const coluna = document.createElement("div");
    coluna.className = "bg-gray-800 p-3 rounded shadow border border-gray-700";
    coluna.innerHTML = `
      <h2 class="text-yellow-400 font-bold capitalize mb-2">${dia}</h2>
      <textarea rows="8" class="w-full p-2 bg-black text-white border border-gray-600 rounded" placeholder="Digite suas tarefas (Ex: tarefa | tipo | energia)"></textarea>
    `;
    painel.appendChild(coluna);
  });
}

function exportarJSON() {
  const data = new Date().toISOString().split("T")[0];
  const semana = {};
  const colunas = document.querySelectorAll("#painel > div");

  dias.forEach((dia, i) => {
    const tarefas = colunas[i].querySelector("textarea").value.trim().split("\n").filter(l => l.trim() !== "");
    semana[dia] = tarefas.map(l => {
      const partes = l.split("|").map(p => p.trim());
      return {
        tarefa: partes[0] || "",
        tipo: partes[1] || "Outro",
        energia: partes[2] || "-"
      };
    });
  });

  const blob = new Blob([JSON.stringify({ data, semana }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `semana-${data}.json`;
  a.click();
}

function gerarMarkdown() {
  const data = new Date().toISOString().split("T")[0];
  const colunas = document.querySelectorAll("#painel > div");
  let md = `# 🧠 Resumo da Semana – Projeto N\n**Data:** ${data}\n\n## ✅ Tarefas realizadas\n`;

  dias.forEach((dia, i) => {
    const linhas = colunas[i].querySelector("textarea").value.trim().split("\n").filter(Boolean);
    if (linhas.length > 0) {
      md += `\n### ${dia.charAt(0).toUpperCase() + dia.slice(1)}\n`;
      linhas.forEach(linha => {
        const partes = linha.split("|").map(p => p.trim());
        const tarefa = partes[0] || "-";
        const tipo = partes[1] || "Outro";
        const energia = partes[2] || "-";
        md += `- ${tarefa} (${tipo} • Energia: ${energia})\n`;
      });
    }
  });

  md += "\n## 💬 Reflexão\nOrganizar a semana com clareza e intenção me ajuda a manter foco e consistência.\n";

  const output = document.createElement("textarea");
  output.className = "w-full mt-6 p-4 bg-gray-900 text-white border border-gray-600 rounded";
  output.rows = 15;
  output.value = md;

  const container = document.getElementById("resultado-md");
  container.innerHTML = "";
  container.appendChild(output);
}

window.addEventListener("DOMContentLoaded", criarPainel);