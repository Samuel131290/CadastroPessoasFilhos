// Estado em memória
let dados = { pessoas: [] };
let pessoaSelecionadaParaFilho = null;

// Renderiza a lista de pessoas e filhos
function render() {
  const container = document.getElementById('listaPessoas');
  container.innerHTML = '';

  dados.pessoas.forEach((p, pi) => {
    const card = document.createElement('div');
    card.className = 'card mb-2';
    const bd = document.createElement('div');
    bd.className = 'card-body';
    bd.innerHTML = `
      <h5 class="card-title d-flex justify-content-between">
        ${p.nome}
        <button class="btn btn-sm btn-danger btn-remover-pessoa" style="margin-left: 10px;" data-id="${pi}">Remover</button>
      </h5>
      <ul class="list-group mb-2">
        ${
          p.filhos.map((f, fi) =>
            `<li class="list-group-item d-flex justify-content-between">
               ${f}
               <button class="btn btn-sm btn-outline-danger btn-remover-filho" style="margin-left: 10px;" data-p="${pi}" data-f="${fi}">Remover filho</button>
             </li>`
          ).join('')
        }
      </ul>
      <button class="btn btn-sm btn-outline-primary btn-add-filho" data-id="${pi}">Adicionar filho</button>
    `;
    card.appendChild(bd);
    container.appendChild(card);
  });

  // Atualiza textarea JSON
  document.getElementById('txtJson').value = JSON.stringify(dados, null, 2);

  // Conecta eventos
  document.querySelectorAll('.btn-remover-pessoa')
    .forEach(btn => btn.onclick = e => {
      dados.pessoas.splice(+e.target.dataset.id, 1);
      render();
    });

  document.querySelectorAll('.btn-add-filho')
    .forEach(btn => btn.onclick = e => {
      pessoaSelecionadaParaFilho = +e.target.dataset.id;
      new bootstrap.Modal(document.getElementById('modalFilho')).show();
    });

  document.querySelectorAll('.btn-remover-filho')
    .forEach(btn => btn.onclick = e => {
      const pi = +e.target.dataset.p, fi = +e.target.dataset.f;
      dados.pessoas[pi].filhos.splice(fi, 1);
      render();
    });
}

// Handlers iniciais
document.getElementById('btnIncluir').onclick = () => {
  const nome = document.getElementById('inputNome').value.trim();
  if (!nome) return;
  dados.pessoas.push({ nome, filhos: [] });
  document.getElementById('inputNome').value = '';
  render();
};

document.getElementById('btnOkFilho').onclick = () => {
  const nomeF = document.getElementById('inputNomeFilho').value.trim();
  if (!nomeF || pessoaSelecionadaParaFilho === null) return;
  dados.pessoas[pessoaSelecionadaParaFilho].filhos.push(nomeF);
  document.getElementById('inputNomeFilho').value = '';
  bootstrap.Modal.getInstance(document.getElementById('modalFilho')).hide();
  render();
};

// AJAX Gravar
document.getElementById('btnGravar').onclick = () => {
  fetch('grava.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  .then(r => r.text())
  .then(txt => alert(txt))
  .catch(err => console.error(err));
};

// AJAX Ler
document.getElementById('btnLer').onclick = () => {
  fetch('ler.php')
    .then(r => r.json())
    .then(js => {
      dados = js;
      render();
    })
    .catch(err => console.error(err));
};

// Primeira renderização
render();
