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

When routes are registered, you are ready to manage a model via REST API. Hovewer, in real world application you may also need to define authorization logic, have validation rules, manage model relationships and more.
