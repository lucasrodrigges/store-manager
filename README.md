# Store Manager

O projeto StoreManager desenvolvido na <a href="https://www.betrybe.com">Trybe</a> utiliza as tecnologias NodeJS, express, MYSQL, sinon e chai.
Com foco na arquitetura MSC (Model, Service, Controller) a aplicação (API RESTful) disponibiliza requisições do tipo GET, POST, PUT, DELETE onde é possível visualizar, cadastrar, editar e excluir produtos e vendas num banco de dados em MYSQL. A aplicação é coberta de testes unitários onde cada camada é testada isoladamente.

## Instruções para instalação

Faça o clone do projeto:

```
git clone git@github.com:lucasrodrigges/store-manager.git
cd store-manager
```

Certifique-se de preencher o '.env' com as informações corretas. Via Docker, nomeie o MYSQL_HOST de 'db', localemnte 'localhost'.

Para rodar localmente certifique-se de ter o MYSQL instalado em sua máquina e rode os comandos:

```
npm run migration; npm run seed
```

Para levantar o servidor instale as dependências e inicie o server com os comandos:

```
npm install; npm run dev
```

Para rodar via Docker certifique-se de ter o Docker e o docker-compose isntalados na máquina e rode os comandos:

```
docker compose up -d; docker exec -it store_manager bash
```

Dentro do container rode os comandos:
```
npm install; npm run dev
```

## Rotas


### Products
<ul>
<li>GET: /products/search?q={sua query} => retorna produtos cadastrados baseados no nome</li>
<li>GET: /products/ => retorna todos os produtos cadastrados</li>
<li>GET: /products/:id => retorna o produto referente ao id informado</li>
<li>POST: /products => cadastra produto no banco de dados</li>
<li>PUT: /products/:id => realiza update de produto específico no banco de dados</li>
<li>DELETE: /products/:id => deleta produto específico do banco de dados</li>
</ul>

### Sales
<ul>
<li>GET: /sales/ => retorna todas as vendas cadastrados</li>
<li>GET: /sales/:id => retorna a venda referente ao id informado</li>
<li>POST: /sales => cadastra nova venda no banco de dados</li>
<li>PUT: /sales/:id => realiza update de venda específica no banco de dados</li>
<li>DELETE: /sales/:id => deleta venda específica do banco de dados</li>
</ul>

## Exemplos de requisições

### Products
Corpo da requição para cadastrar produto:
```
{
  "name": "ProdutoX"
}
```

### Sales
Cortpo da requisição para cadastrar vendas:
```
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

As requisições para update (PUT) seguem o mesmo exemplo, porém passando o id do produto/venda a ser editado.
