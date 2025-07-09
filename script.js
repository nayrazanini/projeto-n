function exportarJSON() {
  const data = new Date().toISOString().split("T")[0];
  const tarefa = document.getElementById("tarefa").value.trim();
  const aprendizado = document.getElementById("aprendizado").value.trim();

  const entrada = {
    data,
    tarefa,
    aprendizado
  };

  const blob = new Blob([JSON.stringify(entrada, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `registro-${data}.json`;
  a.click();
}

function gerarMarkdown() {
  const data = new Date().toLocaleDateString("pt-BR");
  const tarefa = document.getElementById("tarefa").value.trim();
  const aprendizado = document.getElementById("aprendizado").value.trim();

  let md = `# 🧠 Registro Diário – Projeto N\n**Data:** ${data}\n\n## ✅ Atividade\n- ${tarefa}\n\n## 📘 Aprendizado\n- ${aprendizado}\n\n## 💬 Reflexão\nOrganizar meu progresso me ajuda a manter foco e constância.\n`;

  const container = document.getElementById("resultado-md");
  container.innerHTML = "";
  const output = document.createElement("textarea");
  output.className = "w-full mt-6 p-4 bg-gray-900 text-white border border-gray-600 rounded";
  output.rows = 12;
  output.id = "resultado-textarea";
  output.value = md;
  container.appendChild(output);

  const btn = document.createElement("button");
  btn.textContent = "📋 Copiar Markdown";
  btn.className = "mt-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:opacity-90 transition";
  btn.onclick = () => {
    output.select();
    document.execCommand("copy");
    btn.textContent = "✅ Copiado!";
    setTimeout(() => btn.textContent = "📋 Copiar Markdown", 2000);
  };
  container.appendChild(btn);
}

function gerarPostLinkedIn() {
  const data = new Date().toLocaleDateString('pt-BR');
  const tarefa = document.getElementById("tarefa").value.trim();
  const aprendizado = document.getElementById("aprendizado").value.trim();

  const post = `🚀 Hoje (${data}), avancei com o Projeto N!\n\n📌 ${tarefa}\n💡 ${aprendizado}\n\nEsse processo tem me ajudado a manter clareza, foco e evolução constante.\n#ProjetoN #DesenvolvimentoPessoal #Aprendizado #JavaScript`;

  const container = document.getElementById("resultado-md");
  container.innerHTML = "<h2 class='text-lg font-semibold mt-8 mb-2 text-yellow-400'>📝 Texto sugerido para LinkedIn</h2>";
  const textarea = document.createElement("textarea");
  textarea.className = "w-full mt-2 p-4 bg-gray-900 text-white border border-gray-600 rounded";
  textarea.rows = 10;
  textarea.value = post;
  container.appendChild(textarea);

  const btn = document.createElement("button");
  btn.textContent = "🔗 Abrir LinkedIn para postar";
  btn.className = "mt-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:opacity-90 transition";
  btn.onclick = () => {
    textarea.select();
    document.execCommand("copy");
    window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://nayrazanini.github.io/projeto-n/"), "_blank");
  };
  container.appendChild(btn);
}

function gerarPromptChatGPT() {
  const tarefa = document.getElementById("tarefa").value.trim();
  const aprendizado = document.getElementById("aprendizado").value.trim();
  const data = new Date().toLocaleDateString("pt-BR");

  const prompt = `Você é um especialista em gerar textos profissionais e motivadores para LinkedIn.\n\nBaseado no conteúdo abaixo (atividade e aprendizado do dia ${data}), gere um post de LinkedIn claro, humano, leve e com tom de aprendizado e constância.\n\nAtividade: ${tarefa}\nAprendizado: ${aprendizado}\n\nUse emojis com moderação e inclua hashtags relevantes.`;

  const container = document.getElementById("resultado-md");
  container.innerHTML = "<h2 class='text-lg font-semibold mt-8 mb-2 text-yellow-400'>📋 Prompt para ChatGPT</h2>";
  const textarea = document.createElement("textarea");
  textarea.className = "w-full mt-2 p-4 bg-gray-900 text-white border border-gray-600 rounded";
  textarea.rows = 10;
  textarea.value = prompt;
  container.appendChild(textarea);

  const btn = document.createElement("button");
  btn.textContent = "📎 Copiar Prompt";
  btn.className = "mt-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:opacity-90 transition";
  btn.onclick = () => {
    textarea.select();
    document.execCommand("copy");
    btn.textContent = "✅ Copiado!";
    setTimeout(() => btn.textContent = "📎 Copiar Prompt", 2000);
  };
  container.appendChild(btn);
}