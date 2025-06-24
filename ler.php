<?php
header('Content-Type: application/json; charset=utf-8');
$pdo = new PDO('mysql:host=localhost;dbname=turim_db;charset=utf8mb4','root','',[
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

// Busca todas as pessoas
$ps = $pdo->query('SELECT id, nome FROM pessoa')->fetchAll(PDO::FETCH_ASSOC);

// Para cada pessoa, busca filhos
$result = ['pessoas' => []];
$stmtF = $pdo->prepare('SELECT nome FROM filho WHERE pessoa_id = :pid');
foreach ($ps as $p) {
  $stmtF->execute([':pid' => $p['id']]);
  $filhos = $stmtF->fetchAll(PDO::FETCH_COLUMN);
  $result['pessoas'][] = [
    'nome'   => $p['nome'],
    'filhos' => $filhos
  ];
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);
