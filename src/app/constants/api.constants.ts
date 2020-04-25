import {environment} from '../../environments/environment';

export const USER_APIS = {
  login: environment.base_url + 'token/',
  refreshToken: environment.base_url + 'token/refresh/',
  userProfile: environment.base_url + 'users/user/me/'
};


export const CONTACT_APIS = {
  contact: environment.base_url + 'contacts/contact/'
};

export const CORE_APIS = {
  state: environment.base_url + 'core/state/'
};
