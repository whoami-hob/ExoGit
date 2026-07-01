# 🚀 ExoGit - Commercial Management Application

![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Inertia.js](https://img.shields.io/badge/inertia.js-%239553E9.svg?style=for-the-badge&logo=inertia&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 📖 About

ExoGit is a robust, enterprise-ready commercial management application designed to streamline business operations. Built on a modern technology stack leveraging the power of **Laravel 11**, the reactivity of **React**, and the seamless integration of **Inertia.js**. 

This application is now **fully containerized** with **Docker**, ensuring a consistent and reliable environment across development, testing, and production. The Docker setup orchestrates all necessary services, including the web server, PHP runtime, and MySQL database, allowing you to get up and running in minutes with zero local configuration overhead.

## 🚀 Quick Start (Recommended)

The easiest and fastest way to run this application is using our optimized Docker environment. 

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
- [Git](https://git-scm.com/) installed.

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/whoami-hob/ExoGit.git
   cd ExoGit
   ```

2. **Environment Configuration**
   Copy the example environment file and configure your credentials if necessary. The default Docker variables are usually sufficient for local development.
   ```bash
   cp .env.example .env
   ```

3. **Spin up the Docker Containers**
   Launch the application stack in detached mode:
   ```bash
   docker compose up -d
   ```

4. **Install Dependencies & Initialize Database**
   Run the following commands inside the app container (adjust 'app' if your container name is different) to install PHP/Node dependencies, generate the application key, and run migrations:
   ```bash
   docker compose exec app composer install
   docker compose exec app npm install
   docker compose exec app npm run build
   docker compose exec app php artisan key:generate
   docker compose exec app php artisan migrate --seed
   ```

5. **Access the Application**
   Open your browser and navigate to: `http://localhost`

---

## 🛠 Manual Setup (Fallback)

If you prefer not to use Docker, you can set up the application manually on your host machine.

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & npm
- MySQL Server

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/whoami-hob/ExoGit.git
   cd ExoGit
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```

3. **Install NPM Dependencies & Build Assets**
   ```bash
   npm install
   npm run build
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Note: Ensure you update the `.env` file with your local MySQL database credentials.*

5. **Database Migration**
   ```bash
   php artisan migrate --seed
   ```

6. **Serve the Application**
   ```bash
   php artisan serve
   ```
   Visit `http://localhost:8000` in your browser.

## 🏗 Architecture & Stack

- **Backend:** Laravel 11
- **Frontend:** React with Inertia.js
- **Styling:** Tailwind CSS
- **Database:** MySQL
- **Infrastructure:** Docker & Docker Compose

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).