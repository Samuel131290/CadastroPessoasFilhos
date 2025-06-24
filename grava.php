<?php
// Conecta ao MySQL (alterar '' para senha do MySQL, caso houver)
$pdo = new PDO('mysql:host=localhost;dbname=turim_db;charset=utf8mb4','root','',[
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

// Obtém JSON bruto
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// Limpa tabelas (opcional: você pode usar transação e lógica de diffs)
$pdo->beginTransaction();
$pdo->exec('DELETE FROM filho');
$pdo->exec('DELETE FROM pessoa');

// Insere pessoas e filhos
$stmtPessoa = $pdo->prepare('INSERT INTO pessoa(nome) VALUES (:nome)');
$stmtFilho   = $pdo->prepare('INSERT INTO filho(pessoa_id, nome) VALUES (:pid, :nome)');

foreach ($data['pessoas'] as $p) {
  $stmtPessoa->execute([':nome' => $p['nome']]);
  $pid = $pdo->lastInsertId();
  foreach ($p['filhos'] as $f) {
    $stmtFilho->execute([':pid' => $pid, ':nome' => $f]);
  }
}

$pdo->commit();
echo 'Dados gravados com sucesso!';
