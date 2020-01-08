# Search

Laravel Orion allows consumers of your API to use query parameters for filtering, sorting, searching of resources as well as including other related resources (defined as relations on a particular model) together in response.

But first, allowed set of attributes and relations to be used in query parameters needs to be defined in controller.

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

Note `user.id` - using the ~ notation you can specify fields on relations.

## Keyword Search

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