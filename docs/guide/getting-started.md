# Getting Started

## Installation

Laravel Orion can be installed into a new or existing project, simply by adding a composer dependency:

```bash
composer require laravel-orion/laravel-orion
```

## Simple CRUD

Let's assume you have a model `Post` that represents a blog post and you would like to manage it via REST API.

With Laravel Orion it can be acomplished in 3 simple steps:

1. Create `PostsController` and extend it from `Orion\Http\Controllers\Controller`

```php
<?php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{

}
```

2. Then define `protected $model` property and set it to the fully-qualified model class name. The complete controller should look like this

```php
<?php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"
}
```

::: tip TIP
By default Laravel is not shipped with `API` folder in `app/Http/Controllers`, but it is recommended to create one and store all API controllers there to keep the code organized.
:::

::: warning ATTENTION
Make sure to have [policy](https://laravel.com/docs/master/authorization#creating-policies) created and registered for the model you are exposing via the API or consider using `DisableAuthorization` trait (only for local testing) to avoid getting 403 error, if the policy is not registered or incorrect.
:::

3. Finally, register the route in `api.php` by calling `Orion::resource`

```php
<?php

use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    Orion::resource('posts', 'API\PostsController');
});

```

Done :tada: Now you can create, list, search, view, update, and delete blog posts via REST API. Try to create a post via `(POST) https://<your app url>/api/posts` endpoint :wink:

You can also take a look at all available endpoints by running `php artisan route:list` command

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
...
|        | GET|HEAD  | api/posts                                       | api.posts.index                        | App\Http\Controllers\API\PostsController@index                            | api                                             |
|        | POST      | api/posts/search                                | api.posts.search                       | App\Http\Controllers\API\PostsController@index                            | api                                             |
|        | POST      | api/posts                                       | api.posts.store                        | App\Http\Controllers\API\PostsController@store                            | api                                             |
|        | GET|HEAD  | api/posts/{post}                                | api.posts.show                         | App\Http\Controllers\API\PostsController@show                             | api                                             |  
|        | PUT|PATCH | api/posts/{post}                                | api.posts.update                       | App\Http\Controllers\API\PostsController@update                           | api                                             |
|        | DELETE    | api/posts/{post}                                | api.posts.destroy                      | App\Http\Controllers\API\PostsController@destroy                          | api                                             |
|        | POST      | api/posts/batch                                 | api.posts.batchStore                   | App\Http\Controllers\API\PostsController@batchStore                       | api                                             |
|        | PATCH     | api/posts/batch                                 | api.posts.batchUpdate                  | App\Http\Controllers\API\PostsController@batchUpdate                      | api                                             |
|        | DELETE    | api/posts/batch                                 | api.posts.batchDestroy                 | App\Http\Controllers\API\PostsController@batchDestroy                     | api                                             |
```
