# ClimaTempo API

## Descrição

Essa é uma aplicação desenvolvida usando [Nest](https://github.com/nestjs/nest) para prover recursos a plataforma ClimaTempo.

## Instalação
Para instalar os pacotes necessário você deve ter o [NodeJS instalado na versão LTS em conjundo com o gerenciador de pacotes NPM](https://nodejs.org/en/download) e rodar o seguinte comando:

```bash
$ npm install
```

## Rodando a API
Para rodar a aplicação você deve ter o [NodeJS instalado na versão LTS em conjundo com o gerenciador de pacotes NPM](https://nodejs.org/en/download) e seguir os passos:
 - Configure um banco de dados PostgreSQL;
 - Atualize o arquivo [ormconfig.ts](./ormconfig.ts) com as credenciais do banco de dados;
 - Crie um arquivo .env (na raiz da pasta backend) a partir do arquivo [.env.example](./.env.example) e atualize a váriavel de ambiente API_WEATHER_KEY com a chave obtida no site da [OpenWeatherMap](https://home.openweathermap.org/api_keys);
 - Rode um dos seguintes comandos:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 - Acesse [localhost:3001](localhost:3001) e aproveite!

### Dica
Para rodar a aplicação, você pode instalar o [Docker com Docker Compose LTS](https://www.docker.com/), abrir o Docker Desktop e seguir os passos :
 - Copie o conteúdo do [ormconfig_test.ts](./ormconfig_test.ts) para o [ormconfig.ts](./ormconfig.ts);
 - Rode o seguinte comando (na raiz da pasta backend) para subir um banco de dados PostgreSQL:
```bash
$ docker-compose up --wait
```
 - Rode um dos seguintes comandos (na raiz da pasta backend):
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
  - Acesse [localhost:3001](localhost:3001) e aproveite!

Você pode finalizar o banco de dados a qualquer momento usando o comando:
```bash
$ docker-compose down
```

## Testando
Para executar os testes você pode seguir os passos:
 - Como o [Docker com Docker Compose LTS](https://www.docker.com/) instalado, execute o seguinte comando (na raiz da pasta backend) para subir um banco de dados:
```bash
$ docker-compose up --wait
```
 - E rode um dos seguintes comandos (na raiz da pasta backend):
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
Para finalizar a execução do banco de dados execute o seguinte comando (na raiz da pasta backend):
```bash
$ docker-compose down
```

# Endpoints da API

## POST `/usuarios`
Usado para criar um usuário.

### Exemplo de body (JSON)
```
{
	"nome": "Lucas Santos Rodrigues",
	"email": "lucas@mail.com",
	"senha": "1234567"
}
```
### Exemplo de resposta
HTTP CODE: `201`
```
{
	"id": "d75a226f-9317-42e1-9df5-a97cd375e7a2"
}
```
 - ID retornado é referente ao ID do novo usuários.

## GET `/usuarios/:id`
Usado para buscar um usuário.
 - O :id é um id válido de um usuário.
 - Deve conter no **Headers** a chave **Authentication** com o valor de um **token Bearer** válido.

## Exemplo de requisição
```
/usuarios/d75a226f-9317-42e1-9df5-a97cd375e7a2
```

### Exemplo de resposta
HTTP CODE: `200`
```
{
	"nome": "Lucas Santos Rodrigues",
	"email": "lucas@mail.com"
}
```

## POST `/auth/login`
Usado para obter um token Bearer.

### Exemplo de body (JSON)
```
{
	"email": "lucas@mail.com",
	"senha": "1234567"
}
```

### Exemplo de resposta
HTTP CODE: `200`
```
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ3NWEyMjZmLTkzMTctNDJlMS05ZGY1LWE5N2NkMzc1ZTdhMiIsImVtYWlsIjoibHVjYXNAbWFpbC5jb20iLCJpYXQiOjE2OTE3NzY1OTMsImV4cCI6MTY5MjM4MTM5M30.NfPGr7simg72ADJusN6DIldO_b8tQqPIF2r7Fz2kFLc"
}
```

## GET `/climas/:cidade`
Usado para buscar a latitude e longitude dado uma cidade.

### Exemplo de requisição
```
/climas/nova-iorque
```

### Exemplo de resposta
HTTP CODE: `200`
```
[
	{
		"name": "New York",
		"lat": 40.7127281,
		"lon": -74.0060152
	}
]
```

## POST `/usuarios/:id/cidades`
Usado para adicionar uma cidade ao um usuário.
 - O :id é um id válido de um usuário.
 - Deve conter no **Headers** a chave **Authentication** com o valor de um **token Bearer** válido.

### Exemplo de requisição
```
/usuarios/3a9acf0d-fefc-4051-b06a-9d52d58559ee/cidades
```

### Exemplo de body (JSON)
```
{
	"ref": "New York",
	"lat": 40.7127281,
	"lon": -74.0060152
}
```

### Exemplo de resposta
HTTP CODE: `201`
```
{
	"id": "2e703e63-6c33-44d7-b3b0-a27e1cc82204"
}
```
 - ID retornado é referente ao ID da nova cidade.
 
## GET `/usuarios/:id/cidades`
Usado para pegar todas cidades de um usuário.
 - O :id é um id válido de um usuário.
 - Deve conter no **Headers** a chave **Authentication** com o valor de um **token Bearer** válido.

### Exemplo de requisição
```
/usuarios/3a9acf0d-fefc-4051-b06a-9d52d58559ee/cidades
```

### Exemplo de resposta
HTTP CODE: `200`
```
{
	"id": "3a9acf0d-fefc-4051-b06a-9d52d58559ee",
	"cidades": [
		{
			"id": "2e703e63-6c33-44d7-b3b0-a27e1cc82204",
			"ref": "New York",
			"lat": "40.7127281",
			"lon": "-74.0060152"
		}
	]
}
```
 
## DELETE `/usuarios/:id/cidades/:idCidade`
Usado para remover uma cidade de um usuário.
 - O :id é um id válido de um usuário.
 - O :idCidade é um id válido de uma cidade.
 - Deve conter no **Headers** a chave **Authentication** com o valor de um **token Bearer** válido.

### Exemplo de requisição
```
/usuarios/3a9acf0d-fefc-4051-b06a-9d52d58559ee/cidades/2e703e63-6c33-44d7-b3b0-a27e1cc82204
```

### Exemplo de resposta
HTTP CODE: `204`
```
No Body
```

## GET `/usuarios/:id/climas`
Usado para pegar o clima de todas as cidades de um usuário.
 - O :id é um id válido de um usuário.
 - Deve conter no **Headers** a chave **Authentication** com o valor de um **token Bearer** válido.

### Exemplo de requisição
```
/usuarios/3a9acf0d-fefc-4051-b06a-9d52d58559ee/climas
```

### Exemplo de resposta
HTTP CODE: `204`
```
[
	{
		"nome": "New York",
		"current": {
			"coord": {
				"lon": -74.006,
				"lat": 40.7127
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "algumas nuvens",
					"icon": "02d"
				}
			],
			"base": "stations",
			"main": {
				"temp": 26.81,
				"feels_like": 28.54,
				"temp_min": 23.86,
				"temp_max": 29.31,
				"pressure": 1010,
				"humidity": 70
			},
			"visibility": 10000,
			"wind": {
				"speed": 5.66,
				"deg": 170
			},
			"clouds": {
				"all": 20
			},
			"dt": 1691881362,
			"sys": {
				"type": 1,
				"id": 4610,
				"country": "US",
				"sunrise": 1691834591,
				"sunset": 1691884751
			},
			"timezone": -14400,
			"id": 5128581,
			"name": "New York",
			"cod": 200
		}
	}
]
```
