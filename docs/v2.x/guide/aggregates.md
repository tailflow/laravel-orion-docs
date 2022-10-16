# Aggregates

Laravel Orion allows the consumers of your API to aggregate relations by two way: post and query params.
Available aggregates are the following: "count", "avg", "sum", "min", "max" and "exists"

### Whitelisting Relations

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The relations that are allowed to be included together with a resource.
    *
    * @return array
    */
    public function aggregates() : array
    {
        return ['user', 'user.team', 'user.profile', 'meta'];
    }

    ...
}
```

It is also possible to use wildcards to reduce the overhead of defining all possible relations:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The relations that are allowed to be included together with a resource.
    *
    * @return array
    */
    public function aggregates() : array
    {
        return ['user.*', 'meta'];
    }

    ...
}
```

::: danger NOTE

Be aware that "count" and "exists" aggregates doesn't works like the others and relates on "relation" only without the "field".

:::

## Query params

To instruct the API to return aggregates via query params, url needs to contain the related aggregate. The elements needs to be specified coma separated.

### Count

```bash
(GET) https://myapp.com/api/posts?with_count=user,meta
```

### Exists

```bash
(GET) https://myapp.com/api/posts?with_exists=user,meta
```

### Average

```bash
(GET) https://myapp.com/api/users?with_avg=posts.stars
```

### Sum

```bash
(GET) https://myapp.com/api/users?with_sum=posts.stars
```

### Min

```bash
(GET) https://myapp.com/api/users?with_min=posts.stars
```

### Max

```bash
(GET) https://myapp.com/api/users?with_max=posts.stars
```

## Post params

If you want to take advantage of more powerfull aggregates, you can use post params.

### Count

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "type": "count"
    }
  ]
}
```

### Exists

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "type": "exists"
    }
  ]
}
```

### Average

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "field": "stars",
      "type": "avg"
    }
  ]
}
```
### Sum

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "field": "stars",
      "type": "sum"
    }
  ]
}
```

### Min

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "field": "stars",
      "type": "min"
    }
  ]
}
```
### Max

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "field": "stars",
      "type": "max"
    }
  ]
}
```

## Filtering

You can also specify filters in your queries. These filters supports nested filtering.

```json
{
  "aggregate": [
    {
      "relation": "posts",
      "type": "count",
      "filters": [
        {"field" : "posts.created_at", "operator" : ">=", "value" : "2020-01-01"}
      ]
    },
    {
      "relation": "posts",
      "field": "id",
      "type": "avg",
      "filters": [
        {"field" : "posts.created_at", "operator" : ">=", "value" : "2020-01-01"},
        {"nested": [
          {"field": "posts.id", "operator": "=", "value": 1},
          {"field": "posts.id", "operator": ">", "value": 10, "type": "or"}
        ]}
      ]
    }
  ]
}
```

::: warning NOTE

Filters needs to be whitelisted in the "filterableBy" method of your controller.

:::