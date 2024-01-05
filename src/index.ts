import { DB as DBClient } from './db/tasks';

const db = new DBClient();
db.init().then(async (resole) => {
  const response = await db.write(10, 'legs day', 'open');
  console.log(response);
  const task = await db.find(10);
  console.log(task);
});
