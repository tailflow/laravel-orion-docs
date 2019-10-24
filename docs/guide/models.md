# Models

## Setting up Controller

To expose a model through API, first you need to create a controller for it. As you may have seen in the [Getting Started - Simple CRUD](./getting-started.html#simple-crud) section, defining a model controller is pretty straightforward.

```php
<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Laralord\Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected static $model = Post::class; // or "App\Models\Post"
}
```

::: warning KEY TAKEAWAYS

* Model controllers always extend `Laralord\Orion\Http\Controllers\Controller`
* `$model` property is set to a fully qualified model class name

:::

## Setting up Routes

Once controller is created, it is the time to register routes.

```php
<?php

use Illuminate\Support\Facades\Route;
use Laralord\Orion\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::resource('posts', 'API\PostsController');
    ...
});

```

Essentially, `Orion::resource` method is the same as Laravel's default `Route::apiResource` - it will create multiple routes to handle a variety of actions on the resource.

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
...
|        | GET|HEAD  | api/posts                                       | api.posts.index                        | App\Http\Controllers\API\PostsController@index                            | api                                             |
|        | POST      | api/posts                                       | api.posts.store                        | App\Http\Controllers\API\PostsController@store                            | api                                             |
|        | GET|HEAD  | api/posts/{post}                                | api.posts.show                         | App\Http\Controllers\API\PostsController@show                             | api                                             |  
|        | PUT|PATCH | api/posts/{post}                                | api.posts.update                       | App\Http\Controllers\API\PostsController@update                           | api                                             |
|        | DELETE    | api/posts/{post}                                | api.posts.destroy                      | App\Http\Controllers\API\PostsController@destroy                          | api                                             |
```

### Soft Deletes

If your model uses `SoftDeletes` trait and you would like to expose the same functionality via API, add `'softDeletes' => true` to the options array in the last parameter of the route registration method.

```php
<?php

use Illuminate\Support\Facades\Route;
use Laralord\Orion\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::resource('posts', 'API\PostsController', ['softDeletes' => true]);
    ...
});

```

This will introduce `restore` endpoint. To learn how to permanently delete a resource via API (force delete), take a look at the related [Query Parameters](./query-parameters.html#soft-deletes) section.

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
...
|        | POST      | api/posts/{post}/restore                        | api.posts.restore                      | App\Http\Controllers\API\PostsController@restore                          | api                                             |
```
