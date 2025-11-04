# 📦 AWS S3 Upload

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Fastify](https://img.shields.io/badge/Fastify-5.6.1-black?logo=fastify)
![AWS S3](https://img.shields.io/badge/AWS-S3-orange?logo=amazon-aws)
![License](https://img.shields.io/badge/License-MIT-blue)

> Exemplo de implementação de upload utilizando AWS S3 com Node.js

Este projeto demonstra como realizar upload de arquivos para o Amazon S3 usando Node.js, Fastify e o AWS SDK v3. É uma solução simples e eficiente para gerenciar uploads de arquivos em aplicações web.


## 📑 Tabela de Conteúdos

- [Visão Geral](#-visão-geral)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura / Estrutura de Pastas](#-arquitetura--estrutura-de-pastas)
- [Instalação](#-instalação)
- [Uso / Exemplos de Execução](#-uso--exemplos-de-execução)
- [Ambiente e Configurações](#-ambiente-e-configurações)
- [Licença](#-licença)

## 🎯 Visão Geral

O **AWS S3 Upload** é um projeto de exemplo que demonstra como implementar um servidor de upload de arquivos utilizando o Amazon Simple Storage Service (S3). O projeto foi desenvolvido para servir como referência e ponto de partida para desenvolvedores que precisam integrar uploads de arquivos em suas aplicações.

### Objetivos

- ✅ Demonstrar integração com AWS S3 usando AWS SDK v3
- ✅ Fornecer uma API REST simples para upload de arquivos
- ✅ Exemplificar boas práticas de estruturação de código Node.js
- ✅ Facilitar o aprendizado sobre gerenciamento de arquivos na nuvem

### Funcionalidades

- Upload de arquivos para o Amazon S3
- Geração automática de chaves únicas para os arquivos
- Retorno da URL pública do arquivo após upload
- Suporte a múltiplos tipos de arquivo (através do Content-Type)


## 🛠 Tecnologias Utilizadas

### Principais

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **AWS SDK v3 (@aws-sdk/client-s3)** - SDK oficial da AWS para S3
- **@fastify/multipart** - Plugin para processamento de multipart/form-data

### Dependências

- **dotenv** - Gerenciamento de variáveis de ambiente

### Versões

- Node.js: 18+ (recomendado)
- npm: 9+ (recomendado)

## 🏗 Arquitetura / Estrutura de Pastas

```
aws-s3/
├── src/
│   ├── routes/
│   │   └── upload.route.js      # Rotas da API de upload
│   ├── services/
│   │   └── s3.services.js        # Serviço de integração com S3
│   └── server.js                 # Configuração do servidor Fastify
├── node_modules/                 # Dependências do projeto
├── package.json                  # Configurações e dependências
├── package-lock.json             # Lock file das dependências
└── README.md                     # Este arquivo
```

### Descrição dos Componentes

- **`server.js`**: Configura e inicializa o servidor Fastify, registra as rotas e define a porta de execução
- **`routes/upload.route.js`**: Define o endpoint `/upload` que recebe arquivos via POST
- **`services/s3.services.js`**: Contém a lógica de integração com o AWS S3, incluindo upload e geração de URLs

## 🚀 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- Conta AWS com acesso ao S3
- Bucket S3 criado na AWS

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/fbcamargo/aws-s3-upload.git
   cd aws-s3-upload
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
    PORT=3000
    AWS_REGION=sua_regiao
    AWS_ACCESS_KEY_ID=sua_access_key_aqui
    AWS_SECRET_ACCESS_KEY=sua_secret_key_aqui
    AWS_BUCKET_NAME=nome_do_seu_bucket
    AWS_BUCKET_PREFIX=prefixo_do_seu_bucket
   ```

   > ⚠️ **Importante**: Nunca commite o arquivo `.env` no repositório. Adicione-o ao `.gitignore`.

4. **Inicie o servidor**

   ```bash
   node src/server.js
   ```

   O servidor estará rodando em `http://localhost:3000`

## 📖 Uso / Exemplos de Execução

### Endpoint de Upload

**POST** `/upload`

Upload de um arquivo para o S3.

#### Request

```bash
curl -X POST http://localhost:3000/upload \
  -F "file=@caminho/para/seu/arquivo.pdf"
```

#### Response (Sucesso - 201)

```json
{
  "message": "Upload realizado com sucesso",
  "key": "prefixo_do_seu_bucket/550e8400-e29b-41d4-a716-446655440000",
  "url": "https://nome_do_seu_bucket.s3.sua_regiao.amazonaws.com/prefixo_do_seu_bucket/550e8400-e29b-41d4-a716-446655440000"
}
```

#### Response (Erro - 400)

```json
{
  "error": "Arquivo não enviado"
}
```

#### Response (Erro - 406)

```json
{
  "statusCode": 406,
  "code": "FST_INVALID_MULTIPART_CONTENT_TYPE",
  "error": "Not Acceptable",
  "message": "the request is not multipart"
}
```

### Exemplo com JavaScript (Fetch API)

```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);

const response = await fetch("http://localhost:3000/upload", {
  method: "POST",
  body: formData,
});

const result = await response.json();
console.log("URL do arquivo:", result.url);
```

### Exemplo com Postman

1. Abra o Postman
2. Selecione o método **POST**
3. URL: `http://localhost:3000/upload`
4. Vá para a aba **Body**
5. Selecione **form-data**
6. Adicione uma chave `file` do tipo **File**
7. Selecione o arquivo desejado
8. Clique em **Send**

## 🔧 Ambiente e Configurações

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente (definidas no arquivo `.env`):

| Variável                | Descrição                             | Exemplo                                    |
| ----------------------- | ------------------------------------- | ------------------------------------------ |
| `PORT`            | Porta do servidor                   | `3000`                                |
| `AWS_REGION`            | Região do bucket S3                   | `us-east-1`                                |
| `AWS_ACCESS_KEY_ID`     | Access Key ID da AWS                  | `AKIAIOSFODNN7EXAMPLE`                     |
| `AWS_SECRET_ACCESS_KEY` | Secret Access Key da AWS              | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_BUCKET_NAME`       | Nome do bucket S3                     | `meu-bucket-uploads`                       |
| `AWS_BUCKET_PREFIX`     | Prefixo para organização dos arquivos | `uploads`                                  |

### Configuração do AWS S3

1. **Criar um bucket S3**

   - Acesse o [Console da AWS](https://console.aws.amazon.com/s3/)
   - Crie um novo bucket
   - Configure as permissões conforme necessário

2. **Criar credenciais IAM**

   - Crie um usuário IAM com permissões para S3
   - Gere Access Key ID e Secret Access Key

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ por [@fbcamargo](https://github.com/fbcamargo) usando Node.js e AWS S3**