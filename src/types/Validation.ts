import { Login } from './Login';
import { Error } from './Error';

export type Validation = {
  error: Error | undefined;
  value: Login | undefined;
};