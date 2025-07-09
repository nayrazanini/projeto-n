const dias = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

function criarPainel() {
  const painel = document.getElementById("painel");
  if (!painel) {
    console.error("Elemento #painel não encontrado no HTML.");
    return;
  }
  painel.innerHTML = "";
  dias.forEach(dia => {
    const coluna = document.createElement("div");
    coluna.className = "bg-gray-800 p-4 rounded shadow border border-gray-700 flex flex-col gap-2";
    coluna.innerHTML = `
      <h2 class="text-yellow-400 font-bold capitalize text-lg">${dia}</h2>
      <textarea rows="10" class="tarefa w-full p-3 bg-black text-white border border-gray-600 rounded" placeholder="Tarefa (Ex: Estudar JavaScript)"></textarea>
      <textarea rows="6" class="aprendizado w-full p-3 bg-black text-white border border-gray-600 rounded" placeholder="Aprendizados/Anotações do dia"></textarea>
    `;
    painel.appendChild(coluna);
  });
}

function exportarJSON() {
  const data = new Date().toISOString().split("T")[0];
  const semana = {};
  const colunas = document.querySelectorAll("#painel > div");

  dias.forEach((dia, i) => {
    const tarefa = colunas[i].querySelector(".tarefa").value.trim();
    const aprendizado = colunas[i].querySelector(".aprendizado").value.trim();
    semana[dia] = [{
      tarefa: tarefa || "-",
      aprendizado: aprendizado || "-"
    }];
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
  let md = `# 🧠 Resumo da Semana – Projeto N\n**Data:** ${data}\n\n## ✅ Tarefas e Aprendizados\n`;

  dias.forEach((dia, i) => {
    const tarefa = colunas[i].querySelector(".tarefa").value.trim();
    const aprendizado = colunas[i].querySelector(".aprendizado").value.trim();
    if (tarefa || aprendizado) {
      md += `\n### ${dia.charAt(0).toUpperCase() + dia.slice(1)}\n`;
      if (tarefa) md += `- **Tarefa:** ${tarefa}\n`;
      if (aprendizado) md += `  - Aprendizado: ${aprendizado}\n`;
    }
  });

  md += "\n## 💬 Reflexão\nOrganizar a semana com clareza e intenção me ajuda a manter foco e consistência.\n";

  const output = document.createElement("textarea");
  output.className = "w-full mt-6 p-4 bg-gray-900 text-white border border-gray-600 rounded";
  output.rows = 15;
  output.id = "resultado-textarea";
  output.value = md;

  const container = document.getElementById("resultado-md");
  container.innerHTML = "";
  container.appendChild(output);

  // Botão copiar
  const botaoCopiar = document.createElement("button");
  botaoCopiar.textContent = "📋 Copiar Markdown";
  botaoCopiar.className = "mt-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:opacity-90 transition";
  botaoCopiar.onclick = () => {
    output.select();
    document.execCommand("copy");
    botaoCopiar.textContent = "✅ Copiado!";
    setTimeout(() => botaoCopiar.textContent = "📋 Copiar Markdown", 2000);
  };
  container.appendChild(botaoCopiar);
}

window.addEventListener("DOMContentLoaded", criarPainel);