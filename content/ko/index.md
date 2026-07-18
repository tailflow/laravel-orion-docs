---
title: Orion for Laravel
description: Laravel로 REST API를 만드는 가장 간단한 방법
seo:
  title: Orion for Laravel - Laravel로 REST API를 만드는 가장 간단한 방법
  description: Eloquent 모델과 연관관계를 완전한 기능을 갖춘 Laravel REST API로 전환하세요 — 검색, 훅, TypeScript SDK, OpenAPI 명세를 기본 제공합니다.
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
  v2.23.0 출시
  :::

#title
Orion for Laravel

#description
Laravel로 REST API를 만드는 가장 간단한 방법

#links
  :::u-button
  ---
  to: /ko/guide
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  시작하기
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
  GitHub에서 스타 누르기
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
    title: 간단하지만 강력합니다
    description: 익숙한 Laravel의 간결함 그대로, Eloquent 모델과 연관관계를 위한 완전한 기능의 REST API를 제공합니다.
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-sparkles
    title: 사용하고 배우기 쉽습니다
    description: 요청 클래스, 정책, API 리소스 등 Laravel의 표준 기능을 활용합니다.
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-layers
    title: SDK와 OpenAPI 명세
    description: TypeScript SDK와 OpenAPI 명세를 기본 제공합니다.
    ---
    ::::
  :::
::

::u-page-section
---
orientation: horizontal
---
#title
먼저 컨트롤러를 정의하세요

#description
이후 컨트롤러에서 작업 훅, 필터링·검색 가능한 속성, 포함 가능한 연관관계 등을 설정하게 됩니다.

#links
  :::u-button
  ---
  to: /ko/guide/models
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  모델
  :::

  :::u-button
  ---
  to: /ko/guide/relationships
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  연관관계
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
        * 모델의 완전한 클래스 이름
        */
        protected $model = Post::class; // 또는 "App\Models\Post"
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
        * 모델의 완전한 클래스 이름
        */
        protected $model = Post::class; // 또는 "App\Models\Post"

        /**
        * Post 모델에 정의된 관계 이름
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
다음으로 라우트를 등록하세요

#description
Orion은 모델 또는 연관관계 API 리소스 전체를 코드 한 줄로 등록하는 방법을 제공합니다.

#links
  :::u-button
  ---
  to: /ko/guide/models#라우트-설정
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  자세히 알아보기
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
마지막으로 완전한 기능을 갖춘 REST API를 사용하세요

#description
이제 표준화된 API를 통해 게시물과 태그를 관리할 수 있습니다.

  :::note{icon="i-lucide-lightbulb"}
  API를 통해 노출하는 모델에 대한 정책이 있는지 확인하세요.
  :::

  :::note{icon="i-lucide-lightbulb"}
  또는 로컬 테스트 시에는 `DisableAuthorization` 트레이트 사용을 고려할 수 있습니다. 정책이 등록되지 않았거나 잘못된 경우 발생하는 403 오류를 피할 수 있습니다.
  :::

#links
  :::u-button
  ---
  to: /ko/guide/hooks
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  훅
  :::

  :::u-button
  ---
  to: /ko/guide/search
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  검색
  :::

  :::u-button
  ---
  to: /ko/guide/security
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  보안
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
OpenAPI 명세 생성

#description
명령어 하나만 실행하면 OpenAPI 명세를 자동으로 생성할 수 있습니다.

#links
  :::u-button
  ---
  to: /ko/guide/specifications
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  자세히 알아보기
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
