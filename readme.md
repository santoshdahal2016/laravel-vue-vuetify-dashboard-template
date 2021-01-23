<p align="center"><img height="50%" src="/public/images/logo.png" width="400"></p>


## About Laravel Vue Dashboard

This SPA Dashboard act as the decoupled component , which can be installed with any version of laravel by following documentation . The default function shipped with the laravel are untouched 
 such as  Auth function and new component added are properly documented . The core objective of building this dashboard are :
 
 1. Learning : Documentation helps you to build this dashboard as Build Yourself software from scratch .
 
 2. Re-usability : The dashboard acts as the decoupled component , which can be installed with any version of laravel by following documentation .
 3. Scalability :
 We have include minimum required feature for each module , so the development can be made faster and the software can be realized and 
  bring into market in short terms. This reduce the initial cost for development and give the investor enough time to test the system and reshape 
  to user real requirement .
 
## Features

- Laravel 6.0 (Default Shipped)
- Vue + VueRouter + Vuex 
- SPA 
- Default Laravel Login, register, email verification and password reset
- Vuetify with material design
- Single Page Backend Architecture
- Installation and Admin Creation 
- Store based state Management
- Role based Authentication
- Error Handling and Validation
- User Management
- Profile Management
- CRUD with Full text Search

[Read Documentation](https://www.suntos.com.np/laravel-vue-vuetify-dashboard-template/)


## Demo

<img  src="/public/images/demo/login.png" >
<img src="/public/images/demo/register.png" >
<img  src="/public/images/demo/users.png" >
<img  src="/public/images/demo/dashboard.png" >
<img  src="/public/images/demo/account_email.png" >
<img  src="/public/images/demo/account-password.png" >

## Steps

### Installation
- composer install

```
composer install
```
- npm install
  
```
  npm install
```
- Copy .env.example to .env
```
cp .env.example .env
```

### Database

- Fill up  database credentials in .env

- Run Migration
```
php artisan migrate
```

### Root User Creation

```
php artisan register:admin
```

### Setting Vue Backend Configuration

- Set serverUrl present at **resource>js>store>index.js**

- Compile NPM

```
npm run watch-poll
```

[Read Documentation](https://www.suntos.com.np/laravel-vue-vuetify-dashboard-template/)
