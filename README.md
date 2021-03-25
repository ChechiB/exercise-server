# exercise-server

Back-end utilizado para obtener datos sobre productos a partir de la API de MercadoLibre.

## Como correr el back-end
- crear archivo .env en la raiz del proyecto con las siguientes variables
```
SERVER_PORT=3000
APP_ID=<your_ml_app_id>
SECRET_KEY=<your_secret_ml_key>
```
- npm install
- npm start

## Como correr el front-end
- clonar el siguiente [repositorio](https://github.com/ChechiB/exercise-front)
- crear archivo .env en la raiz del proyecto con las siguientes variables
```
REACT_APP_API_URL=http://localhost:3000/api
PORT=4000
```
- npm install
- npm start
## Endpoints

#### [GET] {API}/item/:id
- response:
```
HTTP 200
{
    “author”: {
        “name”: String
        “lastname”: String
    },
    “item”: {
        "id": String,
        "title": String,
        "price": {
            "currency": String,
            "amount": Number,
            "decimals": Number,
        },
        “picture”: String,
        "condition": String,
        "free_shipping": Boolean,
        "sold_quantity", Number
        "description": String,
        "breadcrumb": [{
            "id": string,
            "name": string
        },
        {...}]
    }
}
```

#### [GET] {API}/items?q=:query
- query param:
```
    query: string
```
- response:
```
HTTP 200
{
    “author”: {
        “name”: String
        “lastname”: String
    },
    "categories": [{
        "id": string,
        "name": string
    },
    {...}],
    “item”: [{
        "id": String,
        "title": String,
        "price": {
            "currency": String,
            "amount": Number,
            "decimals": Number,
        },
        “picture”: String,
        "condition": String,
        "free_shipping": Boolean
    },
    {...}]
}
```


## Funcionalidades a desarrollar
- Implementar manejo de errores de la API de MercadoLibre
- Complementar los http status de los endpoints (400, 404, 500)
- Implementar typescript