---
title: Orion for Laravel
description: 使用 Laravel 创建 REST API 的最简单方式
seo:
  title: Orion for Laravel - 使用 Laravel 创建 REST API 的最简单方式
  description: 将你的 Eloquent 模型和关联转换为功能完备的 Laravel REST API——搜索、钩子、TypeScript SDK 与 OpenAPI 规范开箱即用。
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
  v2.23.0 已发布
  :::

#title
Orion for Laravel

#description
使用 Laravel 创建 REST API 的最简单方式

#links
  :::u-button
  ---
  to: /zh/guide
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  快速开始
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
  在 GitHub 上加星
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
    title: 简单而强大
    description: 为你的 Eloquent 模型和关联提供功能完备的 REST API，同时保持你所热爱的 Laravel 的简洁。
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-sparkles
    title: 易于使用与学习
    description: 使用标准的 Laravel 特性，例如请求类、策略和 API 资源。
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-layers
    title: SDK 与 OpenAPI 规范
    description: TypeScript SDK 与 OpenAPI 规范开箱即用。
    ---
    ::::
  :::
::

::u-page-section
---
orientation: horizontal
---
#title
首先，定义控制器

#description
之后，你可以在控制器上设置操作钩子、可过滤和可搜索的属性、可包含的关联等。

#links
  :::u-button
  ---
  to: /zh/guide/models
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  模型
  :::

  :::u-button
  ---
  to: /zh/guide/relationships
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  关联
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
        * 模型的完全限定类名
        */
        protected $model = Post::class; // 或 "App\Models\Post"
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
        * 模型的完全限定类名
        */
        protected $model = Post::class; // 或 "App\Models\Post"

        /**
        * 在 Post 模型上定义的关联名称
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
然后，注册路由

#description
Orion 提供了一种只需一行代码即可注册整个模型或关联 API 资源的方式。

#links
  :::u-button
  ---
  to: /zh/guide/models#设置路由
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  深入了解路由
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
最后，享受功能完备的 REST API

#description
你现在可以通过标准化的 API 管理文章及其标签了。

  :::note{icon="i-lucide-lightbulb"}
  请确保你为通过 API 暴露的模型定义了策略。
  :::

  :::note{icon="i-lucide-lightbulb"}
  另外，在本地测试时，你可以考虑使用 `DisableAuthorization` trait，以避免在策略未注册或不正确时出现 403 错误。
  :::

#links
  :::u-button
  ---
  to: /zh/guide/hooks
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  钩子
  :::

  :::u-button
  ---
  to: /zh/guide/search
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  搜索
  :::

  :::u-button
  ---
  to: /zh/guide/security
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  安全
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
生成 OpenAPI 规范

#description
只需运行一条命令，即可自动生成 OpenAPI 规范。

#links
  :::u-button
  ---
  to: /zh/guide/specifications
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  深入了解规范
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
