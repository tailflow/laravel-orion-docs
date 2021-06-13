# Specifications

The built-in OpenAPI specification generation feature allows you to produce the specifications with absolutely *no code changes required*.

```bash
php artisan orion:specs
```

The command will create `specs.json` file inside the `storage/app/specs` directory.

## Customizations

### Info and Servers

Specifications' `info` and `servers`  fields are populated from the `orion.php` config file:

```php
'specs' => [
    'info' => [
        'title' => env('APP_NAME'),
        'description' => null,
        'terms_of_service' => null,
        'contact' => [
            'name' => null,
            'url' => null,
            'email' => null,
        ],
        'license' => [
            'name' => null,
            'url' => null,
        ],
            'version' => '1.0.0',
    ],
    'servers' => [
        ['url' => env('APP_URL').'/api', 'description' => 'Default Environment'],
    ],
],
```

::: tip TIP
If you haven't published the config yet, you can do so by running the following command:

```bash
php artisan vendor:publish --tag=orion-config
```
:::

### File Path
If you would like the file to be stored at a different path (e.g. `storage/app/specs/example.yaml`), you can easily customize it by providing the `--path` option.

```bash
# Please note that the given path is a relative path

php artisan orion:specs --path="specs/example.yaml"
```

### File Format

By default, the specifications file is stored in `.yaml` format. However, it is possible to store it in `.json`, simply by providing the `--format` option.

```bash
php artisan orion:specs --format="json"
```

::: tip TIP
If you already have custom endpoints and their OpenAPI specifications, simply put the existing specification file anywhere inside the `storage/app` directory and provide the `--path` option to the command. It will generate specifications for the standard endpoints and merge them with the existing (custom) ones.

```bash
# Please note that the given path is a relative path

php artisan orion:specs --path="specs/existing-specs.yaml"
```
:::

::: warning NOTE

As of now, the *generator* supports only the standard (provided by Laravel Orion) endpoints. Specifications, for any custom endpoints you create, won't be generated.
However, there are plans to make it possible in the next releases.

:::
