import { Database } from './database';

(async () => {
  const db = new Database();
  db.open();
  await db.generateTest();
})();
