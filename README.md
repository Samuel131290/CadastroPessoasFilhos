# Sistema de Gerenciamento de Pessoas e Filhos

O Sistema de Gerenciamento de Pessoas e Filhos é uma aplicação web simples e intuitiva desenvolvida com PHP, HTML, CSS, JavaScript e MySQL.
Permite cadastrar pessoas, atribuir filhos a essas pessoas e gerenciar os dados com uma interface amigável e suporte à persistência via banco de dados.

---

## Funcionalidades do Sistema
### Cadastro e Gerenciamento
- Incluir Pessoa: Adiciona uma nova pessoa à lista.
- Remover Pessoa: Exclui uma pessoa e todos os seus filhos.
- Adicionar Filho: Abre um modal para adicionar filhos à pessoa selecionada.
- Remover Filho: Remove filhos individualmente.

### Persistência de Dados
- Gravar: Salva os dados atuais no banco MySQL via grava.php.
- Ler: Recupera os dados do banco MySQL via ler.php.

### Visualização
- Exibe os dados salvos em formato JSON no painel lateral.

---

## Tecnologias Utilizadas
### Frontend
- HTML5/CSS3: Estrutura e estilo da interface
- Bootstrap 5: Estilização e componentes de modal responsivos
- JavaScript Puro (Vanilla JS): Manipulação de DOM, eventos e comunicação AJAX

### Backend
- PHP 7+: Processamento de requisições e integração com banco de dados
- MySQL: Armazenamento relacional das entidades Pessoa e Filho

---

## COMO EXECUTAR O PROGRAMA?

### Pré-requisitos
- PHP 7 ou superior
- Servidor local (XAMPP, WAMP, Laragon ou similar)
- MySQL

### Configurar ambiente MySQL
- Importar o Banco de Dados
- Execute o script turim_db.sql no Workbench ou outro gerenciador de banco MySQL.

### Configurar o Servidor
- Copie os arquivos do projeto para a pasta htdocs (XAMPP) ou equivalente.
- Verifique se as credenciais de banco em grava.php e ler.php estão corretas:
  
  $pdo = new PDO('mysql:host=localhost;dbname=turim_db;charset=utf8mb4','root','',[
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

### Executar a Aplicação
- Acesse http://localhost/turim_app/index.html no seu navegador.
