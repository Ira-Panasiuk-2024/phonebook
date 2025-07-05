# 📱 Phonebook App / Телефонна книга

_A modern full-stack phonebook application built with React and Node.js_

_Сучасний full-stack додаток телефонної книги, створений за допомогою React та
Node.js_

## 🌐 Live Demo / Жива демонстрація

- **Frontend**:
  [https://phonebook-five-gules.vercel.app/](https://phonebook-five-gules.vercel.app/)
- **Backend API**:
  [https://phonebook-app-j9nn.onrender.com/api-docs/](https://phonebook-app-j9nn.onrender.com/api-docs/)

### 🇺🇸 English

## Overview

This is a full-stack phonebook application that allows users to manage their
contacts efficiently. The application provides a clean, intuitive interface for
adding, editing, deleting, and searching through contacts.

## Features

- ✅ **State Management** - Centralized state management with Redux Toolkit
- ✅ **Token Persistence** - Authentication tokens persist across browser
  sessions
- ✅ **User Authentication** - Secure login and registration system
- ✅ **Contact Management** - Add, edit, delete, and view contacts
- ✅ **Search Functionality** - Quick search through contacts
- ✅ **Modular Styling** - CSS Modules for component-scoped styling
- ✅ **Real-time Updates** - Instant synchronization across sessions
- ✅ **Data Persistence** - Secure storage of contact information
- ✅ **Input Validation** - Client and server-side validation
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Protected Routes** - Route protection based on authentication status

## Tech Stack

### Frontend

- **React** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management library
- **Redux Persist** - State persistence across browser sessions
- **React Router** - Client-side routing
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS Modules** - Scoped and modular CSS styling
- **Modern Normalize** - CSS reset for consistent styling
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Swagger** - API documentation

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

```bash
# Clone the backend repository
git clone https://github.com/Ira-Panasiuk-2024/phonebook-app.git

# Navigate to the project directory
cd phonebook-app

# Install dependencies
npm install

# Create .env file with required environment variables

# Server Configuration
PORT=5000                                    # Port for the server to run on

# MongoDB Configuration
MONGODB_USER=your_mongodb_username          # MongoDB username
MONGODB_PASSWORD=your_mongodb_password      # MongoDB password
MONGODB_URL=your_mongodb_cluster_url        # MongoDB cluster URL
MONGODB_DB=phonebook_db                     # Database name

# Authentication
JWT_SECRET=your_super_secret_jwt_key        # Secret key for JWT token generation

# Application Domain
APP_DOMAIN=http://localhost:5000            # Application domain URL

# Cloudinary Configuration (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name       # Cloudinary cloud name
API_KEY=your_cloudinary_api_key             # Cloudinary API key
API_SECRET=your_cloudinary_api_secret       # Cloudinary API secret
ENABLE_CLOUDINARY=true                      # Enable/disable Cloudinary integration

# Start the development server
npm run dev
```

### Frontend Setup

```bash
# Clone the frontend repository
git clone https://github.com/Ira-Panasiuk-2024/phonebook.git

# Navigate to the project directory
cd phonebook

# Install dependencies
npm install

# Create .env file with backend URL
# VITE_API_URL=

# Start the development server
npm run dev
```

## Redux Store Architecture

The application uses a well-structured Redux store with the following
architecture:

- **Authentication slice** - Manages user authentication state with token
  persistence
- **Contacts slice** - Handles all contact-related operations
- **Selective persistence** - Only authentication tokens are persisted for
  security
- **Redux Toolkit** - Modern Redux with simplified syntax and built-in best
  practices

## Key Redux Features

- **configureStore** - Simplified store setup with good defaults
- **createSlice** - Reduces boilerplate code for actions and reducers
- **Redux Persist** - Automatic state persistence with localStorage
- **Middleware configuration** - Custom middleware for handling non-serializable
  actions

## API Documentation

The backend API is fully documented using Swagger UI. Visit the
[API Documentation](https://phonebook-app-j9nn.onrender.com/api-docs/) to
explore all available endpoints.

---

### 🇺🇦 Українська

## Огляд

Це full-stack додаток телефонної книги, який дозволяє користувачам ефективно
керувати своїми контактами. Додаток надає чистий, інтуїтивний інтерфейс для
додавання, редагування, видалення та пошуку контактів.

## Функціональність

- ✅ **Управління станом** - Централізоване управління станом з Redux Toolkit
- ✅ **Збереження токенів** - Токени автентифікації зберігаються між сесіями
  браузера
- ✅ **Автентифікація користувачів** - Безпечна система входу та реєстрації
- ✅ **Керування контактами** - Додавання, редагування, видалення та перегляд
  контактів
- ✅ **Функція пошуку** - Швидкий пошук серед контактів
- ✅ **Модульна стилізація** - CSS Modules для ізольованого стилювання
  компонентів
- ✅ **Оновлення в реальному часі** - Миттєва синхронізація між сесіями
- ✅ **Збереження даних** - Безпечне зберігання контактної інформації
- ✅ **Валідація введених даних** - Перевірка на клієнті та сервері
- ✅ **Обробка помилок** - Комплексне управління помилками
- ✅ **Захищені маршрути** - Захист маршрутів на основі статусу автентифікації

## Технологічний стек

### Фронтенд

- **React** - Бібліотека для побудови користувацьких інтерфейсів
- **Vite** - Швидкий інструмент збірки та сервер розробки
- **Redux Toolkit** - Бібліотека для управління станом
- **Redux Persist** - Збереження стану між сесіями браузера
- **React Router** - Маршрутизація на стороні клієнта
- **JavaScript (ES6+)** - Сучасні можливості JavaScript
- **CSS Modules** - Модульна та ізольована стилізація CSS
- **Modern Normalize** - CSS reset для консистентної стилізації
- **Axios** - HTTP клієнт для комунікації з API

### Бекенд

- **Node.js** - Середовище виконання JavaScript
- **Express.js** - Фреймворк для веб-додатків
- **MongoDB** - NoSQL база даних для зберігання даних
- **Mongoose** - Моделювання об'єктів MongoDB
- **JWT** - JSON Web Tokens для автентифікації
- **bcrypt** - Хешування паролів
- **Swagger** - Документація API

## Встановлення та налаштування

### Передумови

- Node.js (версія 18 або вище)
- npm або yarn
- MongoDB (локальний або хмарний екземпляр)

### Налаштування бекенду

```bash
# Клонувати репозиторій бекенду
git clone https://github.com/Ira-Panasiuk-2024/phonebook-app.git

# Перейти в директорію проєкту
cd phonebook-app

# Встановити залежності
npm install

# Створити файл .env з необхідними змінними середовища

# Конфігурація сервера
PORT=5000                                    # Порт для запуску сервера

# Конфігурація MongoDB
MONGODB_USER=your_mongodb_username          # Ім'я користувача MongoDB
MONGODB_PASSWORD=your_mongodb_password      # Пароль MongoDB
MONGODB_URL=your_mongodb_cluster_url        # URL кластера MongoDB
MONGODB_DB=phonebook_db                     # Назва бази даних

# Автентифікація
JWT_SECRET=your_super_secret_jwt_key        # Секретний ключ для генерації JWT токенів

# Домен додатка
APP_DOMAIN=http://localhost:5000            # URL домену додатка

# Конфігурація Cloudinary (для завантаження зображень)
CLOUD_NAME=your_cloudinary_cloud_name       # Назва хмари Cloudinary
API_KEY=your_cloudinary_api_key             # API ключ Cloudinary
API_SECRET=your_cloudinary_api_secret       # API секрет Cloudinary
ENABLE_CLOUDINARY=true                      # Увімкнути/вимкнути інтеграцію Cloudinary

# Запустити сервер розробки
npm run dev
```

### Налаштування фронтенду

```bash
# Клонувати репозиторій фронтенду
git clone https://github.com/Ira-Panasiuk-2024/phonebook.git

# Перейти в директорію проєкту
cd phonebook

# Встановити залежності
npm install

# Створити файл .env з URL бекенду
# VITE_API_URL=

# Запустити сервер розробки
npm run dev
```

## Архітектура Redux Store

Додаток використовує добре структурований Redux store з наступною архітектурою:

- **Слайс автентифікації** - Управляє станом автентифікації користувачів зі
  збереженням токенів
- **Слайс контактів** - Обробляє всі операції, пов'язані з контактами
- **Селективне збереження** - Зберігаються лише токени автентифікації для
  безпеки
- **Redux Toolkit** - Сучасний Redux з спрощеним синтаксисом та вбудованими
  кращими практиками

## Ключові функції Redux

- **configureStore** - Спрощене налаштування store з хорошими значеннями за
  замовчуванням
- **createSlice** - Зменшує кількість шаблонного коду для дій та редьюсерів
- **Redux Persist** - Автоматичне збереження стану з localStorage
- **Конфігурація middleware** - Користувацький middleware для обробки
  несеріалізованих дій

## Документація API

Бекенд API повністю документований за допомогою Swagger UI. Відвідайте
[документацію API](https://phonebook-app-j9nn.onrender.com/api-docs/) для
ознайомлення з усіма доступними ендпоінтами.

---

## 👤 Author / Автор

**Ira Panasiuk** / **Ірина Панасюк**

- GitHub: [@Ira-Panasiuk-2024](https://github.com/Ira-Panasiuk-2024)

---

_Made with ❤️ by Ira Panasiuk / Зроблено з ❤️ Ірою Панасюк_
