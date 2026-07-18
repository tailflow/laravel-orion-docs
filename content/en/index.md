---
title: Orion for Laravel
description: The simplest way to create REST API with Laravel
seo:
  title: Orion for Laravel - The simplest way to create REST API with Laravel
  description: Turn your Eloquent models and relationships into a fully featured REST API with Laravel — search, hooks, TypeScript SDK, and OpenAPI specs out of the box.
---

::u-page-hero
---
orientation: horizontal
ui:
  container: 'pb-8 sm:pb-12 lg:pb-16'
---
#headline
  :::u-button
  ---
  to: https://github.com/tailflow/laravel-orion/releases/tag/2.23.0
  target: _blank
  color: primary
  variant: subtle
  size: sm
  trailing-icon: i-lucide-arrow-up-right
  class: rounded-full
  ---
  v2.23.0 released
  :::

#title
Orion for Laravel

#description
The simplest way to create REST API with Laravel

#links
  :::u-button
  ---
  to: /guide
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: outline
  size: lg
  to: https://github.com/tailflow/laravel-orion
  target: _blank
  ---
  Star on Github
  :::

#default
  :::div{class="w-fit max-w-full mx-auto"}
    ::::prose-pre
    ---
    code: |
      composer require tailflow/laravel-orion
    filename: Terminal
    ---

    ```bash [Terminal]
    composer require tailflow/laravel-orion
    ```
    ::::
  :::
::

::u-page-section
---
ui:
  container: 'py-8 sm:py-12 lg:py-16'
---
  :::u-page-grid
    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-rocket
    title: Simple yet powerful
    description: Fully featured REST API for your Eloquent models and relationships with the simplicity of Laravel as you love it.
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-sparkles
    title: Easy to use and learn
    description: Utilizes standard Laravel features such as Request classes, Policies and API Resources.
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-layers
    title: SDK and OpenAPI specs
    description: TypesScript SDK and OpenAPI specifications out of the box.
    ---
    ::::
  :::
::

::u-page-section
---
orientation: horizontal
---
#title
First, define controllers

#description
Later, you would setup operation hooks, filterable and searchable attributes, includable relationships, and more on the controllers.

#links
  :::u-button
  ---
  to: /guide/models
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Models
  :::

  :::u-button
  ---
  to: /guide/relationships
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Relationships
  :::

#default
  :::code-group
    ::::prose-pre{filename="PostsController.php"}
    ```php [PostsController.php]
    <?php

    namespace App\Http\Controllers\Api;

    use App\Models\Post;
    use Orion\Http\Controllers\Controller;

    class PostsController extends Controller
    {
        /**
        * Fully-qualified model class name
        */
        protected $model = Post::class; // or "App\Models\Post"
    }
    ```
    ::::

    ::::prose-pre{filename="PostTagsController.php"}
    ```php [PostTagsController.php]
    <?php

    namespace App\Http\Controllers\Api;

    use App\Models\Post;
    use Orion\Http\Controllers\RelationController;

    class PostTagsController extends RelationController
    {
        /**
        * Fully-qualified model class name
        */
        protected $model = Post::class; // or "App\Models\Post"

        /**
        * Name of the relation as it is defined on the Post model
        */
        protected $relation = 'tags';
    }
    ```
    ::::
  :::
::

::u-page-section
---
orientation: horizontal
reverse: true
---
#title
Then, register routes

#description
Orion provides a way to register entire model or relationship API resources with a single line of code.

#links
  :::u-button
  ---
  to: /guide/models#setting-up-routes
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Learn more
  :::

#default
  :::prose-pre
  ---
  code: |
    <?php

    use Illuminate\Support\Facades\Route;
    use Orion\Facades\Orion;
    use App\Http\Controllers\PostsController;
    use App\Http\Controllers\PostTagsController;

    Route::group(['as' => 'api.'], function() {
        Orion::resource('posts', PostsController::class)->withSoftDeletes();
        Orion::morphToManyResource('posts', 'tags', PostTagsController::class);
    });
  filename: api.php
  ---

  ```php [api.php]
  <?php

  use Illuminate\Support\Facades\Route;
  use Orion\Facades\Orion;
  use App\Http\Controllers\PostsController;
  use App\Http\Controllers\PostTagsController;

  Route::group(['as' => 'api.'], function() {
      Orion::resource('posts', PostsController::class)->withSoftDeletes();
      Orion::morphToManyResource('posts', 'tags', PostTagsController::class);
  });
  ```
  :::
::

::u-page-section
---
orientation: horizontal
---
#title
Finally, enjoy a fully featured REST API

#description
You can now manage posts and their tags via a standardized API.

  :::note{icon="i-lucide-lightbulb"}
  Make sure you have a policy for the model you are exposing via the API.
  :::

  :::note{icon="i-lucide-lightbulb"}
  Alternatively, for local testing, you can consider using the `DisableAuthorization` trait to avoid getting a 403 error if the policy is not registered or is incorrect.
  :::

#links
  :::u-button
  ---
  to: /guide/hooks
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Hooks
  :::

  :::u-button
  ---
  to: /guide/search
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Search
  :::

  :::u-button
  ---
  to: /guide/security
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Security
  :::

#default
  :::code-group
    ::::prose-pre{filename="Posts API"}
    ```bash [Posts API]
    +-----------+------------------------------+-----------------------------+------------------------------------------------------------+------------+
    | Method    | URI                          | Name                        | Action                                                     | Middleware |
    +-----------+------------------------------+-----------------------------+------------------------------------------------------------+------------+
    | GET|HEAD  | api/posts                    | api.posts.index             | App\Http\Controllers\Api\PostsController@index             | api        |
    | POST      | api/posts/search             | api.posts.search            | App\Http\Controllers\Api\PostsController@index             | api        |
    | POST      | api/posts                    | api.posts.store             | App\Http\Controllers\Api\PostsController@store             | api        |
    | GET|HEAD  | api/posts/{post}             | api.posts.show              | App\Http\Controllers\Api\PostsController@show              | api        |
    | PUT|PATCH | api/posts/{post}             | api.posts.update            | App\Http\Controllers\Api\PostsController@update            | api        |
    | DELETE    | api/posts/{post}             | api.posts.destroy           | App\Http\Controllers\Api\PostsController@destroy           | api        |
    | POST      | api/posts/{post}/restore     | api.posts.restore           | App\Http\Controllers\Api\PostsController@restore           | api        |
    | POST      | api/posts/batch              | api.posts.batchStore        | App\Http\Controllers\Api\PostsController@batchStore        | api        |
    | PATCH     | api/posts/batch              | api.posts.batchUpdate       | App\Http\Controllers\Api\PostsController@batchUpdate       | api        |
    | DELETE    | api/posts/batch              | api.posts.batchDestroy      | App\Http\Controllers\Api\PostsController@batchDestroy      | api        |
    | POST      | api/posts/batch/restore      | api.posts.batchRestore      | App\Http\Controllers\Api\PostsController@batchRestore      | api        |
    ```
    ::::

    ::::prose-pre{filename="Post Tags API"}
    ```bash [Post Tags API]
    +———————————+———————————————————————————————————————+————————————————————————————————————————+——————————————————————————————————————————————————————————————+————————————+
    | Method    | URI                                   | Name                                   | Action                                                       | Middleware |
    +———————————+———————————————————————————————————————+————————————————————————————————————————+——————————————————————————————————————————————————————————————+————————————+
    | GET|HEAD  | api/posts/{post}/tags                 | api.posts.relation.tags.index          | App\Http\Controllers\Api\PostTagsController@index            | api        |
    | POST      | api/posts/{post}/tags/search          | api.posts.relation.tags.search         | App\Http\Controllers\Api\PostTagsController@index            | api        |
    | POST      | api/posts/{post}/tags                 | api.posts.relation.tags.store          | App\Http\Controllers\Api\PostTagsController@store            | api        |
    | GET|HEAD  | api/posts/{post}/tags/{tag}           | api.posts.relation.tags.show           | App\Http\Controllers\Api\PostTagsController@show             | api        |
    | PUT|PATCH | api/posts/{post}/tags/{tag}           | api.posts.relation.tags.update         | App\Http\Controllers\Api\PostTagsController@update           | api        |
    | DELETE    | api/posts/{post}/tags/{tag}           | api.posts.relation.tags.destroy        | App\Http\Controllers\Api\PostTagsController@destroy          | api        |
    | POST      | api/posts/{post}/tags/batch           | api.posts.relation.tags.batchStore     | App\Http\Controllers\Api\PostTagsController@batchStore       | api        |
    | PATCH     | api/posts/{post}/tags/batch           | api.posts.relation.tags.batchUpdate    | App\Http\Controllers\Api\PostTagsController@batchUpdate      | api        |
    | DELETE    | api/posts/{post}/tags/batch           | api.posts.relation.tags.batchDestroy   | App\Http\Controllers\Api\PostTagsController@batchDestroy     | api        |
    | POST      | api/posts/{post}/tags/attach          | api.posts.relation.tags.attach         | App\Http\Controllers\Api\PostTagsController@attach           | api        |
    | DELETE    | api/posts/{post}/tags/detach          | api.posts.relation.tags.detach         | App\Http\Controllers\Api\PostTagsController@detach           | api        |
    | PATCH     | api/posts/{post}/tags/sync            | api.posts.relation.tags.sync           | App\Http\Controllers\Api\PostTagsController@sync             | api        |
    | PATCH     | api/posts/{post}/tags/toggle          | api.posts.relation.tags.toggle         | App\Http\Controllers\Api\PostTagsController@toggle           | api        |
    | PATCH     | api/posts/{post}/tags/{tag}/pivot     | api.posts.relation.tags.pivot          | App\Http\Controllers\Api\PostTagsController@updatePivot      | api        |
    ```
    ::::
  :::
::

::u-page-section
---
orientation: horizontal
reverse: true
---
#title
Generate OpenAPI specifications

#description
To automatically generate OpenAPI specifications, simply run one command.

#links
  :::u-button
  ---
  to: /guide/specifications
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  Learn more
  :::

#default
  :::prose-pre
  ---
  code: |
    php artisan orion:specs
  filename: Terminal
  ---

  ```shell [Terminal]
  php artisan orion:specs
  ```
  :::
::
