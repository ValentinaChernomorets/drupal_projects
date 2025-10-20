# Используем PHP 8.1 с Apache
FROM drupal:10.3.0-php8.2-apache

# Установка зависимостей для Drupal
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql gd xml zip

# Включаем mod_rewrite для Apache
RUN a2enmod rewrite

# Устанавливаем Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Устанавливаем Drush глобально через Composer
RUN composer require drush/drush:"^12.0" --no-interaction

# Добавляем Drush в PATH
ENV PATH="$PATH:/root/.composer/vendor/bin"

# Копируем php.ini (если нужно)
COPY ./docker/php-custom.ini /usr/local/etc/php/conf.d/

# Создаем директорию для сайта
WORKDIR /var/www/html



