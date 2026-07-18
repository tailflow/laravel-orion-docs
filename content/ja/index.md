---
title: Orion for Laravel
description: LaravelでREST APIを作成する最もシンプルな方法
seo:
  title: Orion for Laravel - LaravelでREST APIを作成する最もシンプルな方法
  description: EloquentモデルとリレーションをLaravelでフル機能のREST APIに変換します。検索、フック、TypeScript SDK、OpenAPI仕様書を標準で備えています。
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
  v2.23.0リリース
  :::

#title
Orion for Laravel

#description
LaravelでREST APIを作成する最もシンプルな方法

#links
  :::u-button
  ---
  to: /ja/guide
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  はじめる
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
  GitHubでスターを付ける
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
    title: シンプルかつ強力
    description: Eloquentモデルとリレーションを、慣れ親しんだLaravelのシンプルさそのままに、フル機能のREST APIとして提供します。
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-sparkles
    title: 使いやすく学びやすい
    description: Requestクラス、ポリシー、APIリソースといったLaravelの標準機能を活用します。
    ---
    ::::

    ::::u-page-card
    ---
    spotlight: true
    icon: i-lucide-layers
    title: SDKとOpenAPI仕様書
    description: TypeScript SDKとOpenAPI仕様書を標準で利用できます。
    ---
    ::::
  :::
::

::u-page-section
---
orientation: horizontal
---
#title
まず、コントローラーを定義します

#description
後から、操作のフック、フィルタリングや検索が可能な属性、インクルード可能なリレーションなどをコントローラー上で設定します。

#links
  :::u-button
  ---
  to: /ja/guide/models
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  モデル
  :::

  :::u-button
  ---
  to: /ja/guide/relationships
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  リレーション
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
        * モデルの完全修飾クラス名
        */
        protected $model = Post::class; // または "App\Models\Post"
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
        * モデルの完全修飾クラス名
        */
        protected $model = Post::class; // または "App\Models\Post"

        /**
        * Post モデルで定義されているリレーション名
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
次に、ルートを登録します

#description
Orionでは、モデルやリレーションのAPIリソース全体を1行のコードで登録できます。

#links
  :::u-button
  ---
  to: /ja/guide/models#ルートのセットアップ
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  ルートについて詳しく見る
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
最後に、フル機能のREST APIを利用します

#description
標準化されたAPIを通じて、投稿とそのタグを管理できるようになります。

  :::note{icon="i-lucide-lightbulb"}
  APIで公開するモデルに対応するポリシーが用意されていることを確認してください。
  :::

  :::note{icon="i-lucide-lightbulb"}
  また、ローカルでのテストでは、ポリシーが登録されていない、または正しくない場合に403エラーになるのを避けるため、`DisableAuthorization`トレイトの使用を検討できます。
  :::

#links
  :::u-button
  ---
  to: /ja/guide/hooks
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  フック
  :::

  :::u-button
  ---
  to: /ja/guide/search
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  検索
  :::

  :::u-button
  ---
  to: /ja/guide/security
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  セキュリティ
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
OpenAPI仕様書の生成

#description
OpenAPI仕様書を自動生成するには、コマンドを1つ実行するだけです。

#links
  :::u-button
  ---
  to: /ja/guide/specifications
  color: neutral
  variant: subtle
  size: lg
  trailing-icon: i-lucide-arrow-right
  ---
  仕様書について詳しく見る
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
