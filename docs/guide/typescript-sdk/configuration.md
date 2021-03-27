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

If you are using Sanctum, setting the auth driver to `AuthDriver.Sanctum` is necessary to enable automatic [XSRF token](https://laravel.com/docs/8.x/sanctum#csrf-protection) fetching.

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

## Customizing Axios instance

```typescript
import axios from 'axios';

Orion.makeHttpClientUsing(() => {
  const client = axios.create();

  client.interceptors.request.use(...);

  return client;
});
```