# Security

## Authentication

Laravel Orion does not provide any authentication perks at the moment, assuming that developer is responsible for setting up the desired app's authentication capabilities. Hovewer, we recommend using [Laravel Passport](https://github.com/laravel/passport) or [Laravel Sanctum](https://github.com/laravel/sanctum) for this purpose.

## Authorization

Both [model](./models.html) and [relation](./relationships.html) controllers rely on [model policies](https://laravel.com/docs/master/authorization#creating-policies) to determine whether currently authenticated user is allowed to perform certain actions or not.

While it is not recommended, but in some situations you may want to disable authorization checks on a particular controller. To do so, you can use `Orion\Concerns\DisableAuthorization` trait.

```php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Concerns\DisableAuthorization;

class PostsController extends ApiController
{
    use DisableAuthorization;

    /**
     * @var string $model
     */
    protected $model = Post::class;
}
```

### Usage with Sanctum (or any other custom Auth guard)

By default, `api` guard is used to resolve the currently authenticated user for authorization.

However, you can change the way users are resolved either by setting `auth.guard` in `config/orion.php` or by overriding `resolveUser` method on a controller.

```php

namespace App\Http\Controllers\Api;

use App\Models\Post;

class PostsController extends ApiController
{
    /**
     * @var string $model
     */
    protected $model = Post::class;

     /**
     * Retrieves currently authenticated user based on the guard.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function resolveUser()
    {
        return Auth::guard('sanctum')->user();
    }
}
```

### Authorizing parent entities

Relation operations pass an additional argument to policies - the parent entity. You can use that argument to setup additional checks on whether a user is authorized to perform certain actions on a relation entity *in the context of a given parent entity*.

```php
class PostPolicy
{
    public function update($user, $post)
    {
        return $post->user_id === $user->id;
    }
}

class PostMetaPolicy
{
    public function update($user, $postMeta, $post) // <---- $post here is the parent entity
    {
        // please note that the check is performed against
        // the parent entity $post, not the relation entity $postMeta
        return Gate::forUser($user)->inspect('update', $post); 
    }
    
    public function create($user, $post)
    {
        return Gate::forUser($user)->inspect('update', $post);
    }
}
```

### Customizing policy classes

It is quite common to see different authorization rules for the same models used in different controllers or scenarios. By default, the policy is resolved by Laravel using its built-in functionality. However, if you would like to use a specific policy in a controller, set the `protected $policy` or `protected $parentPolicy` variables accordingly:

**Model controller**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Policies\CustomPostPolicy;

class PostsController extends ApiController
{
    /**
     * @var string $model
     */
    protected $model = Post::class;

    /**
     * @var string $policy
     */
    protected $policy = CustomPostPolicy::class;
}
```

**Relation controller**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Team;
use App\Policies\CustomPostPolicy;
use App\Policies\CustomTeamPolicy;
use Orion\Http\Controllers\RelationController;

class TeamPostsController extends RelationController
{
     /**
     * @var string $model
     */
    protected $model = Team::class; // or "App\Models\Team"
    
    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'posts';

    /**
     * @var string $parentPolicy
     */
    protected $parentPolicy = CustomTeamPolicy::class;

   /**
     * @var string $policy
     */
    protected $policy = CustomPostPolicy::class;
}
```

## Validation

:::warning ATTENTION
Request classes **must** extend `Orion\Http\Requests\Request` class instead of `Illuminate\Foundation\Http\FormRequest`.
:::

To validate incoming requests data to `store` and `update` endpoints, Laravel Orion will try to find [request class](https://laravel.com/docs/master/validation#form-request-validation) for resource model following the class name pattern:
 `App\Http\Requests\<model>Request`.

For example, if you have `App\Models\Message` model, the related request class would be `App\Http\Requests\MessageRequest`.

If request class names in your app do not follow this naming convention or if you just would like to be more explicit, set `protected $request` property on controller to a fully-qualified request class name.

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Message;
use App\Http\Requests\CustomMessageRequest;

class MessagesController extends ApiController
{
    /**
     * @var string $model
     */
    protected $model = Message::class;

    /**
    * @var string $request
    */
    protected $request = CustomMessageRequest::class;
}
```

The request class is then binded using Laravel [Service Container](https://laravel.com/docs/master/container) and used in `store` and `update` methods to validate request data the same way as if you would explicitly set it in method signature:

```php
public function store(CustomMessageRequest $request)
{
    ...
}
```

### Validation rules

#### Defining rules for `store` and `update` operations

Laravel Orion provides `Orion\Http\Requests\Request` class with a handful of methods to specify validation rules.

To define common rules for both `store` and `update` endpoints you can use `commonRules` method.
If you would like to define rules specific to an endpoint, you can use `storeRules` and `updateRules` methods.

:::warning ATTENTION
Rules for a particular field specified in the `storeRules` and `updateRules` methods overwrite rules from the `commonRules` method, if both contain the same key.
:::

```php
<?php

namespace App\Http\Requests;

use Orion\Http\Requests\Request;

class PostRequest extends Request
{
    public function commonRules() : array
    {
        return [
            'title' => 'required'
        ];
    }

    public function storeRules() : array
    {
        return [
            'status' => 'required|in:draft,review'
        ];
    }
}
```

In this example, when request is made to `store` endpoint, both `title` and `status` fields will be required. However, when request method is made to `update` endpoint, only `title` field would be required, because there is no other rules defined in `updateRules` method and `title` field is marked as required in the `commonRules` method.

#### Defining rules for relation-specific operations

You can also define rules for relation specific endpoints: `associateRules`, `attachRules`, `detachRules`, `syncRules`, `toggleRules`, `updatePivotRules`.

:::warning ATTENTION
Rules specified in these methods are **NOT** merged with rules from the `commonRules` method.
:::

#### Defining rules for batch operations

You can also define rules for batch endpoints: `batchStoreRules`, `batchUpdateRules`.

### Validation messages

Just like it is possible to configure the rules for specific endpoints, it is possible to customize their validation messages.

#### Customizing validation messages for `store` and `update` operations

To define common messages for both `store` and `update` endpoints you can use `commonMessages` method.
If you would like to define messages specific to an endpoint, you can use `storeMessages` and `updateMessages` methods.

:::warning ATTENTION
Messages for a particular field specified in the `storeMessages` and `updateMessages` methods overwrite messages from the `commonMessages` method, if both contain the same key.
:::

#### Customizing validation messages for relation-specific operations

You can also customize messages for relation-specific endpoints: `associateMessages`, `attachMessages`, `detachMessages`, `syncMessages`, `toggleMessages`, `updatePivotMessages`.

:::warning ATTENTION
Messages specified in these methods are **NOT** merged with messages from the `commonMessages` method.
:::

#### Customizing validation messages for batch operations

You can also customize messages for batch endpoints: `batchStoreMessages`, `batchUpdateMessages`.

### Retrieving request data

By default, upon storing or updating entities, *all* request data is retrieved and passed into the `fill` method on a model.

However, it is possible to pass only the validated data. To do that, set `use_validated` to `true` in `orion.php` config file.
