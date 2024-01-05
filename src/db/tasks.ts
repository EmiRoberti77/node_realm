import Realm, { ObjectSchema } from 'realm';
const initError = 'db has not been initialized';
const added = (name: string) => `added ${name}`;

class Task extends Realm.Object<Task> {
  _id!: number;
  name!: string;
  status?: string;
  owner_id?: string;

  static schema: ObjectSchema = {
    name: 'Task',
    properties: {
      _id: 'int',
      name: 'string',
      status: 'string?',
      owner_id: 'string?',
    },
    primaryKey: '_id',
  };
}

export class DB {
  private realm: Realm | null = null;
  constructor() {}

  public async init(): Promise<void> {
    this.realm = await Realm.open({
      schema: [Task],
    });
  }

  public write(_id: number, name: string, status: string) {
    return new Promise((resolve, reject) => {
      if (!this.realm) {
        return reject({
          error: initError,
        });
      }

      try {
        this.realm.write(() => {
          this.realm!.create(Task, {
            _id,
            name,
            status,
          });
        });
        resolve({
          success: true,
          message: added(name),
        });
      } catch (err: any) {
        reject(err.message);
      }
    });
  }

  public find(id: number) {
    return new Promise((resolve, reject) => {
      if (!this.realm) {
        reject({
          error: initError,
        });
        return;
      }

      const allTask = this.realm.objects(Task);
      const task = allTask.find((task) => task._id === id);
      resolve(task);
    });
  }
}
