import axios from 'axios';
import { LoginJWTResponse } from '../../src/api/youdera/apiTypes'
import { testKey } from '../fixtures/backend-keys';
before(async () => {

  const response = await axios.post<LoginJWTResponse>(
    `https://dev.youdera.com/api/login`,
    {
      email: 'roo@fer.com',
      password: 'roofer123',
      remember: false,
    },
    {
      withCredentials: true,
      headers: { Accept: 'application/json' },
    }
  );

  { console.log(response) }

  const { data } = response;

  await axios.post('https://dev.youdera.com/api/cypress',
    {
      k: testKey
    },
    {
      headers: {
        authorization: `Bearer ${data.access_token}`
      }
    }
  );
});
