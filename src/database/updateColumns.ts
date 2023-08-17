import { pgHelper } from './pg-helper';

async function start() {
  await pgHelper.connect();

  await pgHelper.client.query('alter table apartments add column id uuid ');

  await pgHelper.client.query(
    'alter table apartments add column is_occupied boolean ',
  );
}

start();
