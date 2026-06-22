<p align="center">
  <h1 align="center">🚀 Exogit App</h1>
  <p align="center">
    A modern, lightweight invoicing and commercial management application.
    <br />
    <br />
    <a href="https://github.com/yourusername/exogit-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/yourusername/exogit-app/issues">Request Feature</a>
  </p>
</p>

<!-- BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

## 📖 About The Project

**Exogit** is a robust application designed to streamline your business operations. Built for efficiency, it helps businesses seamlessly manage clients, products, quotations, invoices, and suppliers through a clean, responsive, and dark-mode-ready interface.

### ✨ Key Features

- 👥 **Commercial Management**: Full CRUD operations for Clients, Products, *Devis* (Quotations), *Factures* (Invoices), Suppliers, and *Achats* (Purchases).
- 📄 **PDF Generation**: Seamless PDF export for quotations and invoices using `laravel-dompdf`.
- 🌓 **Modern UI/UX**: Unified authentication layouts with built-in support for both Light and Dark modes.
- 🔒 **Role-Based Access**: Secure administrative dashboard equipped with middleware protection.
- 📱 **Responsive Design**: Flawless experience across all devices, from mobile to desktop, powered by Tailwind CSS.

### 🛠 Tech Stack

- **Backend:** PHP 8.3, Laravel 11
- **Frontend:** React 18, Inertia.js, Lucide Icons
- **Styling:** Tailwind CSS, PostCSS, Vite
- **Database:** SQLite (default) / MySQL / PostgreSQL
- **Key Packages:** `barryvdh/laravel-dompdf`, `laravel/sanctum`, `tightenco/ziggy`

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local machine:
- [PHP >= 8.3](https://www.php.net/downloads)
- [Composer](https://getcomposer.org/)
- [Node.js & npm](https://nodejs.org/en/download/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/exogit-app.git
   cd exogit-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install NPM packages**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Copy the example environment file and generate an application key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Storage Link**
   Required for PDF generation and file handling:
   ```bash
   php artisan storage:link
   ```

6. **Database & Mail Configuration**
   - Configure your `DB_CONNECTION` in `.env` (SQLite is default).
   - Configure `MAIL_MAILER` and credentials (e.g., Mailtrap) for password recovery emails.
   - Run database migrations:
     ```bash
     php artisan migrate
     ```

---

## 💻 Development

Exogit uses Vite to bundle the frontend assets and Laravel's built-in server for the backend. 

To start the development environment efficiently, you can use the predefined composer script:

```bash
composer run dev
```

*(This command uses concurrently to run the Laravel server, Vite, and other background processes simultaneously).*

Alternatively, you can run them manually in separate terminals:

```bash
# Terminal 1: Start Vite
npm run dev

# Terminal 2: Start Laravel Server
php artisan serve
```

---

## 📂 Project Layout

- `app/Http/Controllers/`: Manages all application business logic.
- `resources/js/Pages/`: React components for pages (Inertia routes).
- `resources/js/Layouts/`: Shared layouts (`AuthLayout`, `AuthenticatedLayout`).
- `routes/web.php`: Defines all application routes and middleware.
- `database/migrations/`: Database schema definitions.

---

## 💡 Useful Commands

- **Update database schema:**
  ```bash
  php artisan migrate
  ```
- **Populate database with dummy data:**
  ```bash
  php artisan db:seed
  ```
- **Run test suite:**
  ```bash
  php artisan test
  ```
- **Compile assets for production:**
  ```bash
  npm run build
  ```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

*Please follow PSR-12 coding standards and ensure all tests pass before submitting.*

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
