import { DB as DBClient } from './db/tasks';

const db = new DBClient();
db.init().then(async (resole) => {
  //const response = await db.write(12, 'legs day', 'open');
  //console.log(response);
  const task = await db.find(1);
  console.log(task);
  const allOpenTasks = await db.findBy('open');
  console.log(allOpenTasks);
});
