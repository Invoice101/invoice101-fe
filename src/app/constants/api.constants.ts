import {environment} from '../../environments/environment';

export const USER_APIS = {
  login: environment.base_url + 'token/',
  user_profile: environment.base_url + 'users/user/me/'
};
