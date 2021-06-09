# Specifications

The built-in OpenAPI specification generation feature allows you to produce the specifications with absolutely *no code changes required*.

```bash
php artisan orion:specs
```

The command will create `specs.yaml` file inside the `storage/app/specs` directory.

## Customizations

### File Path
If you would like the file to be stored at a different path (e.g. `storage/app/specs/example.yaml`), you can easily customize it by providing the `--path` option.

```bash
# Please note that the given path is a relative path

php artisan orion:specs --path="specs/example.yaml"
```

### File format

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
