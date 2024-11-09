<div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuYoubdEtrE9C4RHowyZVbg8_xoFwLzAvnXcftUqWnm2PzbbC5l3Gv6W93B2_w-FesAqw&usqp=CAU)" width="200" height="200" />
<img src="https://docs.nestjs.com/assets/logo-small-gradient.svg" width="200" height="200" />
<img src="https://velog.velcdn.com/images/this_summer/post/8491073d-2b96-4097-8115-efadbae4adbd/image.png" width="200" height="200" /></div>

# Nexu Project

This is a **NestJS** project built with **TypeORM** and a **PostgreSQL** database. Below you'll find instructions on how to set up the project and configure the necessary environment variables.

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- **Node.js** (recommended version 16 or higher)
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** (make sure you have a running PostgreSQL instance)

## Installation

### 1. Clone the repository

Start by cloning the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies

Once inside the project directory, install the necessary dependencies using your preferred package manager:

For **npm**:

```bash
npm install
```

For **yarn**:

```bash
yarn install
```

For **pnpm**:

```bash
pnpm install
```

### 3. Set up environment variables

This project uses **dotenv** to manage environment variables. Create a `.env` file at the root of the project with the following variables (If you needed you can based on the `.env.example` file):

```bash
# .env

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=nexu_db
```

These variables are used to connect your application to the PostgreSQL database. Make sure to replace the values with those corresponding to your own database configuration.

#### Explanation of variables:

- **DB_HOST**: The host address where your database is running (default: `localhost`).
- **DB_PORT**: The port your PostgreSQL instance is listening on (default: `5432`).
- **DB_USERNAME**: The username to access the database.
- **DB_PASSWORD**: The password associated with the username.
- **DB_NAME**: The name of the database that the project will connect to.

### 4. Start the project

Once you've set up the `.env` file, you can start the development server with the following command:

For **npm**:

```bash
npm run start:dev
```

For **yarn**:

```bash
yarn start:dev
```

For **pnpm**:

```bash
pnpm run start:dev
```

This will start the NestJS server in development mode. The project will be available at `http://localhost:3000`.

### 5. Run migrations (if necessary)

If you need to run database migrations, use the following command:

For **npm**:

```bash
npm run migration:run
```

For **yarn**:

```bash
yarn migration:run
```

For **pnpm**:

```bash
pnpm run migration:run
```

This will apply any pending migrations to your database.

---

## Available Scripts

Here are some of the available scripts you can run from the terminal:

- **Start the server in development mode**:

  ```bash
  npm run start:dev
  ```

  Or for **yarn**:

  ```bash
  yarn start:dev
  ```

  Or for **pnpm**:

  ```bash
  pnpm run start:dev
  ```

- **Build the project for production**:

  ```bash
  npm run build
  ```

  Or for **yarn**:

  ```bash
  yarn build
  ```

  Or for **pnpm**:

  ```bash
  pnpm run build
  ```

- **Run database migrations (still in progress)**:

  ```bash
  npm run migration:run
  ```

  Or for **yarn**:

  ```bash
  yarn migration:run
  ```

  Or for **pnpm**:

  ```bash
  pnpm run migration:run
  ```

- **Run tests**:

  ```bash
  npm run test
  ```

  Or for **yarn**:

  ```bash
  yarn test
  ```

  Or for **pnpm**:

  ```bash
  pnpm run test
  ```

- **Run tests in watch mode (still in progress)**:

  ```bash
  npm run test:watch
  ```

  Or for **yarn**:

  ```bash
  yarn test:watch
  ```

  Or for **pnpm**:

  ```bash
  pnpm run test:watch
  ```

---

## Common Issues

1. **Module not found**:
   If you encounter an error like `Cannot find module`, make sure your import paths are correct. In a NestJS project, the paths should be relative unless you are using custom aliases.

2. **Database connection error**:
   If the project is unable to connect to the database, check your `.env` file and ensure that PostgreSQL is running and accessible on the correct port.

3. **Migration issues**:
   If you face problems with migrations, ensure that your database is running correctly and that the configurations in the `.env` file are accurate.

---

## Contributing

If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch with the changes you'd like to make.
3. Create a **Pull Request** with a clear description of the changes made.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
