# Prologue

## Upgrade Guide

This guide covers the process of upgrading Laravel Orion from v1.x to v2.x.

### PHP 7.3 required

The new minimum PHP version is now 7.3.0.

### Updating dependencies

Update the following dependencies in your `composer.json` file:

- `php` to `>=7.3`
- `tailflow/laravel-orion` to `^2.0`

### Publishing config

The release introduces `orion.php` config file, allowing you to customize the default auth driver and information about api for specifications generation.

To publish the config, run the following command:

```bash
php artisan vendor:publish --tag=orion-config
```

### Whitelisting methods signature

The following methods have been made `public`:

- `exposedScopes`
- `filterableBy`
- `searchableBy`
- `sortableBy`
- `includes`
- `alwaysIncludes`

Please update your controllers accordingly, should you have any of these methods overridden.

### Hook methods signature

Starting with 2.0 release, a parent entity is passed into the hook methods. Please update your controllers accordingly, should you have any hook methods overridden.

Here is an example:

**Before 2.0**

```php
protected function afterSave(Request $request, Model $entity)
```

**After 2.0**

```php
protected function afterSave(Request $request, Model $parentEntity, Model $entity)
```
