# INSHOP CRM

Inshop CRM is powerful framework which allows to build systems for business with different workflows.
It has on board multi language support, clients management, projects & tasks, documents, simple accounting, inventory management, 
orders & invoice management, possibilities to integrate with third party software, REST API, and many other features.

https://inshopcrm.com/

![alt text](https://inshopcrm.com/static/vuetify/signin.png "Inshop CRM login page")

![alt text](https://inshopcrm.com/static/vuetify/dashboard.png "Inshop CRM login dashboard with charts")

![alt text](https://inshopcrm.com/static/vuetify/calendar.png "Inshop CRM login dashboard with charts")

## Live demo
Feel free to check out our demo CRM instance

Username: demo

Password: demo

https://demo.inshopcrm.com/signin


## Main Features

 * Multi language support
 * Clients management
 * Projects
 * Tasks
 * Calendar with events & reminders
 * Documents & templates

## Technologies

### Admin panel (Current project)
- React, Next.js, Redux, RTK Query, MUI
- Docker
- GIT

VueJS version can be found here https://github.com/inshopgroup/inshop-crm-admin

### Backend
 - PHP 8.2
 - Symfony 6
 - API Platform
 - Postgres

# Installation

## For developers

```bash
# admin
git clone git@github.com:inshopgroup/inshop-crm-admin-react.git
cd inshop-crm-admin-react
cp .env.dist .env
yarn install
yarn run dev
cd ..
```

## Setup backend

For more details check API repository https://github.com/inshopgroup/inshop-crm-api
