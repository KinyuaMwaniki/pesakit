## Installation

- git clone https://github.com/KinyuaMwaniki/orders.git 
- cd orders
- composer install
- npm install
- npm run dev
- cp .env.example .env
- php artisan key:generate
- Create db and change .env database connection to the following

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your-db-name
    DB_USERNAME=your-db-username
    DB_PASSWORD=your-db-password

- php artisan migrate --seed