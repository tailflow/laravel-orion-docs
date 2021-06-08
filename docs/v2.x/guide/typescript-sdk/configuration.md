# Configuration

## API url

```typescript
Orion.init('https://your-api.test');
```

## API prefix

By default, the prefix value is set to `api`, however, in some cases you might want to change that.

```typescript
Orion.init('https://your-api.test', 'api/v1');
// or
Orion.setPrefix('api/v1');
```

## Auth driver

```typescript
import {AuthDriver} from '@tailflow/laravel-orion/lib/drivers/default/enums/authDriver';

Orion.init('https://your-api.test', 'api', AuthDriver.Sanctum);
// or
Orion.setAuthDriver(AuthDriver.Sanctum);
```

## Token

```typescript
import {AuthDriver} from '@tailflow/laravel-orion/lib/drivers/default/enums/authDriver';

Orion.init('https://your-api.test', 'api', AuthDriver.Sanctum, 'test-acess-token');
// or
Orion.setToken('test-access-token');
```

## Integration with Sanctum for SPA

Before you can make requests to the API, [CSRF protection](https://laravel.com/docs/master/sanctum#csrf-protection) needs to be initialized.

```typescript
import {AuthDriver} from '@tailflow/laravel-orion/lib/drivers/default/enums/authDriver';

Orion.init('https://your-api.test');
Orion.setAuthDriver(AuthDriver.Sanctum);

try {
    await Orion.csrf();
    // now you can make requests to the API
    const posts = await Post.$query().get();
} catch (error) {
    console.error('Unable to retrieve CSRF cookie.');
}
```

## Customizing Axios instance

```typescript
import axios from 'axios';

Orion.makeHttpClientUsing(() => {
  const client = axios.create();

  client.interceptors.request.use(...);

  return client;
});
```
