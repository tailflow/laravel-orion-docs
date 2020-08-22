# Security

## Authentication

Laravel Orion does not provide any authentication perks at the moment, assuming that developer is responsible for setting up the desired app's authentication capabilities. Hovewer, we recommend using [Laravel Passport](https://github.com/laravel/passport) or [Laravel Sanctum](https://github.com/laravel/sanctum) for this purpose.

## Authorization

By default, both [model](./models.html) and [relation](./relationships.html) controllers rely on [model policies](https://laravel.com/docs/master/authorization#creating-policies) to determine whether currently authenticated user is allowed to perform certain actions or not.

While it is not recommended, but in some situations you may want to disable authorization checks on a particular controller. To do so, you can use `Orion\Traits\DisableAuthorization` trait.

```php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Orion\Traits\DisableAuthorization;

class PostsController extends APIController
{
    use DisableAuthorization;

    /**
     * @var string $model
     */
    protected $model = Post::class;
}
```

## Validation

To validate incoming requests data to `store` and `update` endpoints, Laravel Orion will try to find [request class](https://laravel.com/docs/master/validation#form-request-validation) for resource model following the class name pattern:
 `App\Http\Requests\<model>Request`.

For example, if you have `App\Models\Message` model, the related request class would be `App\Http\Requests\MessageRequest`.

If request class names in your app do not follow this naming convention or if you just would like to be more explicit, set `protected $request` property on controller to a fully-qualified request class name.

```php

namespace App\Http\Controllers\API;

use App\Models\Message;
use App\Http\Requests\CustomMessageRequest;

class MessagesController extends APIController
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

### Validation Rules

#### Defining rules for `store` and `update` endpoints

Laravel Orion provides `Orion\Http\Requests\Request` class with a handful of methods to specify validation rules.

To define common rules for both `store` and `update` endpoints you can use `commonRules` method.
If you would like to define rules specific to endpoint you can use `storeRules` and `updateRules` methods.

:::warning ATTENTION
Rules specified in `storeRules` and `updateRules` methods are merged with rules from `commonRules` method.
:::

```php
<?php

namespace App\Http\Requests;

use Orion\Http\Requests\Request;

class PostRequest extends Request
{
    public function commonRules()
    {
        return [
            'title' => 'required'
        ];
    }

    public function storeRules()
    {
        return [
            'status' => 'required|in:draft,review'
        ];
    }
}
```

In this example, when request is made to `store` endpoint, both `title` and `status` fields will be required. However, when request method is made to `update` endpoint, only `title` field would be required, because there is no other rules defined in `updateRules` method and `title` field is marked as required in the `commonRules` method.

#### Defining rules for relation methods

You can also define rules for relation specific endpoints: `associateRules`, `attachRules`, `detachRules`, `syncRules`, `toggleRules`, `updatePivotRules`.

:::warning ATTENTION
Rules specified in these methods are **NOT** merged with rules from `commonRules` method.
:::

#### Defining rules for batch operations

You can also define rules for batch endpoints: `batchStore`, `batchUpdate`.
