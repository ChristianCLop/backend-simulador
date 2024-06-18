<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="public/img/logoApp.png" width="200" alt="Nest Logo" /></a>
</p>

# CrediPlan

A payment table simulator with two amortization systems: French and German
## Tech Stack

**Backend:** Nest.js

**Database:** PostgreSQL

## Run Locally

Clone the project

```bash
  git clone https://github.com/ChristianCLop/DealDash-Ecommerce-Frontend.git
```

Go to the project directory

```bash
  cd DealDash-Ecommerce-Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Features

- Bank administration
    - Banks CRUD
        - Modify interest rate
    - Credit types CRUD 
    - Indirects Charges CRUD 
- Credit Simulation
    - Select type of amortization systems
    - PDF download
- Investment Simulation
    - PDF download

## API Reference

#### Admin

```http
  POST /admin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ced_adm` | `number` | Admin **ID** |
| `nom_adm` | `string` | Admin **Name** |
| `ape_adm` | `string` | Admin **Lastname** |
| `dir_adm` | `string` | Admin **City** |
| `tel_adm` | `number` | Admin **Phone** |
| `cor_adm` | `string` | Admin **Email** |
| `con_adm` | `string` | Admin **Password** |

```http
  POST /admin/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cor_adm` | `string` | Admin **Email** |
| `con_adm` | `string` | Admin **Password** |

#### Bank

```http
  POST /banco
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nom_ban` | `string` |  **Name** |
| `log_ban` | `string` |  **Logo** |
| `tas_ban` | `number` |  **Investment Rate** |

#### Credit

```http
  POST /tipo-credito
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nom_cre` | `string` |  **Name** |
| `int_cre` | `number` |  **Interest Rate** |
| `bancoId` | `number` |  **Bank Id** |

#### Charge

```http
  POST /cobro
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nom_cob` | `string` |  **Name** |
| `int_cob` | `number` |  **Interest Rate** |
| `creditoId` | `number` |  **Credit Id** |


## Authors

- [@Christian Chico](https://www.github.com/ChristianCLop)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)

## Feedback

If you have any feedback, you can find me at my socials. 

