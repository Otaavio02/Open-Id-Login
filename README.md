## Autenticação com Firebase e OpenID Connect

Este repositório apresenta um exemplo completo e funcional de uma aplicação web que implementa login e cadastro de usuários, utilizando o Firebase para autenticação e o Firestore para armazenamento de dados. O objetivo do projeto é demonstrar a integração de autenticação e autorização usando OpenID Connect.

## Tecnologias Empregadas

Firebase Authentication: Gerencia o processo de login e cadastro de usuários, incluindo autenticação por e-mail e senha.

Cloud Firestore: Banco de dados NoSQL usado para armazenar informações adicionais do usuário, como nome, sobrenome e e-mail, de maneira segura.

HTML, CSS e JavaScript: Servem de base para a interface e a lógica do front-end, com um design responsivo e moderno.

## Principais Funcionalidades

A aplicação oferece os seguintes recursos:

Cadastro de Usuário: Permite que novos usuários criem uma conta fornecendo nome, sobrenome, e-mail e senha. Caso o e-mail já esteja em uso, é exibida uma mensagem de erro.

Login de Usuário: Usuários existentes podem acessar a conta usando suas credenciais. O ID do usuário autenticado é armazenado no localStorage.

Página Inicial (Homepage): Após o login, o usuário é redirecionado para uma página que mostra seus dados (nome, sobrenome e e-mail) obtidos do Firestore.

Logout: O usuário pode encerrar a sessão, removendo seu ID do localStorage e sendo redirecionado de volta para a tela de login.

Navegação entre Formulários: A interface alterna de forma suave entre os formulários de login e cadastro, controlada via JavaScript.

## Passos para Configuração

Criar um Projeto no Firebase: Acesse o console do Firebase, crie um novo projeto e habilite o Firebase Authentication (E-mail/Senha) e o Cloud Firestore.

Obter as Configurações: Adicione um aplicativo web ao projeto e copie o objeto de configuração (firebaseConfig).

Atualizar os Arquivos: Substitua os valores de configuração nos arquivos firebaseauth.js e homepage.js com suas chaves do Firebase.

Executar a Aplicação: Abra o arquivo index.html em seu navegador para testar a aplicação.

Estrutura dos Arquivos

index.html: Página inicial com os formulários de login e cadastro.

homepage.html: Página mostrada após o login, exibindo os dados do usuário.

firebaseauth.js: Lógica de autenticação e integração com o Firestore para cadastro e login.

homepage.js: Gerencia o estado do usuário logado e busca os dados para exibição na homepage.

script.js: Controla a exibição e alternância entre os formulários de login e cadastro.

style.css: Estilos da interface, incluindo responsividade e design moderno.

## Licença

Este projeto é distribuído sob a Licença Pública Geral GNU v3.0 (GPLv3).