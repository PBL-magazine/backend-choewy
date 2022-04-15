# Schema

# Database

```sql
CREATE DATABASE magazine;
USE magazine;
```

## Tables

### users

```sql
CREATE TABLE users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL,
	nickname VARCHAR(20) NOT NULL,
	password VARCHAR(100) NOT NULL,
  role INTEGER NOT NULL DEFAULT 0
);
```

### posts

```sql
CREATE TABLE posts (
	post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL,
	content text NOT NULL,
	image VARCHAR(255),
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	deleted_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### post_likes

```sql
CREATE TABLE post_likes (
	post_id INT NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (post_id) REFERENCES posts(post_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### post_comments

```sql
CREATE TABLE post_comments (
	comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	post_id INT NOT NULL,
	user_id INT NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	deleted_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY (post_id) REFERENCES posts(post_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

# Sequelize

## 1. install

```
$ npm i -s sequelize mysql2
$ npm i -D sequelize-cli
```

## 2. initialize

```
$ npx sequelize init
```

## 3. Edit configs

```
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "magazine_development",
    "host": "127.0.0.1",
    "port": 5002,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "magazine_test",
    "host": "127.0.0.1",
    "port": 5002,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "magazine_production",
    "host": "127.0.0.1",
    "port": 5002,
    "dialect": "mysql"
  }
}
```

## 4. Create Database

```
$ npx sequelize db:create --env development
```

## 5. Create Model

```
$ npx sequelize model:generate --name ${ MODEL_NAME } --attributes ${ FIELD : TYPE }
```

### 5.1. Create User Model

```
$ npx sequelize model:generate --name users --attributes email:string,nickname:string,image_url:string,password:string
```

### 5.2. Edit User Model

`models/user.js`

```js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      underscored: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );
  return User;
};
```

## 6. Edit Migration

`migrations/${timestamp}-create-user.js`

```js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
```

## 7. Create Table

```
$ npx sequelize db:migrate --env development
```

## 8. Drop Table

```
$ npx sequelize db:migrate:undo --env development
```
