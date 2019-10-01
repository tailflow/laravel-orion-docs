# Query Parameters
Laravel Orion allows consumers of your API to use query parameters for filtering, sorting, searching of resources as well as including other related resources (defined as relations on a particular model) together in response.

But first, <s>let me take a selfie</s> allowed set of attributes and relations to be used in query parameters needs to be defined in controller.

## Filtering

```php

namespace App\Http\Controllers\API;

use Laralord\Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The attributes that are used for filtering.
    *
    * @return array
    */
    protected function filterableBy()
    {
        return ['id', 'title', 'user.id'];
    }

    ...
}
```

To filter results based on one or several attributes, url needs to contain attribute names and values as query parameters.

<b>Pattern:</b> `https://<app url>/api/<resource>?<attribute>=<value>...`

<b>Example:</b> `https://<app url>/api/posts?title=ExactMatch&user.id=7`

## Sorting

```php

namespace App\Http\Controllers\API;

use Laralord\Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ... 

    /**
     * The attributes that are used for sorting.
     *
     * @return array
     */
    protected function sortableBy()
    {
         return ['id', 'title', 'created_at', 'user.name'];
    }

    ...
}
```

To sort results, url needs to contain `sort` query parameter.

<b>Pattern:</b> `https://<app url>/api/<resource>?sort=<attribute>|<direction>`, where `<attribute>` is one of the defined in `sortableBy` method attributes and `<direction>` is either `asc` or `desc`.

<b>Example:</b> `https://<app url>/api/posts?sort=title|desc`


## Searching

```php

namespace App\Http\Controllers\API;

use Laralord\Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ... 

    /**
     * The attributes that are used for searching.
     *
     * @return array
     */
    protected function searchableBy()
    {
        return ['title', 'description', 'user.name'];
    }

    ...
}
```

To search across resources, url needs to contain `q` query parameter. API will search in ALL of the defined in `searchableBy` method attributes.

<b>Pattern:</b> `https://<app url>/api/<resource>?q=<search text>`

<b>Example:</b> `https://<app url>/api/posts?q=This is my search query`

## Including Relations

```php

namespace App\Http\Controllers\API;

use Laralord\Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ... 

    /**
    * The relations that are allowed to be included together with a resource.
    *
    * @return array
    */
    protected function includes()
    {
        return ['user'];
    }

    ...
}
```

Sometimes you may want to include relationships together with the returned resources. To do that, url needs to contain `include` query parameter with a comma separated list of relations.

<b>Pattern:</b> `https://<app url>/api/<resource>?include=<relation a>,<relation b>...`

<b>Example:</b> `https://<app url>/api/posts?include=user`

::: warning KEY TAKEAWAYS
* Only attributes defined in `filterableBy`, `sortableBy`, `searchableBy` and relations in `includes` can be used in query parameters
* It is possible (and super convenient) to use nested attributes/relations (e.g. `user.name`)
:::