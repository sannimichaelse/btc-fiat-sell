import development from './env/development';
import test from './env/test';
import production from './env/production';

const environment = {
  development,
  test,
  production
};

export default environment[process.env.NODE_ENV || 'development'];
