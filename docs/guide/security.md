# Security

## Authentication
Laravel Orion does not provide any authentication perks at the moment, assuming that developer is responsible for setting up the desired app's authentication capabilities. Hovewer, we recommend using [Laravel Passport](https://github.com/laravel/passport) for this purpose.

## Authorization
By default, both [model](./models.html) and [relation](./relationships.html) controllers rely on [model policies](https://laravel.com/docs/master/authorization#creating-policies) to determine whether currently authenticated user is allowed to perform certain actions or not.

While it is not recommended, but in some situations you may want to disable authorization checks on a particular controller. To do so, you can use `Laralord\Orion\Traits\DisableAuthorization` trait.

```php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Laralord\Orion\Traits\DisableAuthorization;

class PostsController extends APIController
{
    use DisableAuthorization;

    /**
     * @var string|null $model
     */
    protected static $model = Post::class;
}
```

## Validation
To validate incoming requests data to `store` and `update` endpoints, Laravel Orion will try to find related [request class](https://laravel.com/docs/master/validation#form-request-validation) for resource model using the pattern:
 `App\Http\Requests\<model>Request`.

For example, if you have `App\Models\Message` model, the related request class would be `App\Http\Requests\MessageRequest`.

If request class names in your app do not follow this naming convention or if you just would like to be more explicit, set `protected static $request` property on controller to a fully-qualified request class name.

```php

namespace App\Http\Controllers\API;

use App\Models\Message;
use App\Http\Requests\CustomMessageRequest;

class MessagesController extends APIController
{
    /**
     * @var string|null $model
     */
    protected static $model = Message::class;

    /**
    * @var string|null $request
    */
    protected static $request = CustomMessageRequest::class;
}
```

The request class is then binded using Laravel [Service Container](https://laravel.com/docs/master/container) and used in `store` and `update` methods to validate request data the same way as if you would explicitly set it in method signature:

```php

public function store(CustomMessageRequest $request)
{
    ...
}

```