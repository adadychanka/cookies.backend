# DB

### Dev
Before starting the application you should create db. You can do it through pgAdmin.

### Stage | Prod
For remote DB management should use pgAdmin 13

---

# Development flow

### Dev -> Stage -> Prod

---

# Env variables

```
# Only for dev; Heroku set instance port automatically
PORT=

# For all environmets
ENV= DEV | STAGE | PROD

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT

ETH_PROVIDER_URL=
ETH_WS_PROVIDER_URL=
```
