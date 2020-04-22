import {environment} from '../../environments/environment';

export const USER_APIS = {
  login: environment.base_url + 'token/',
  user_profile: environment.base_url + 'users/user/me/'
};


export const CUSTOMER_APIS = {
  customer: environment.base_url + 'customer/customer/'
};

export const CORE_APIS = {
  state: environment.base_url + 'core/state/'
};
