import { Connection } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

export function useGlobalAutopopulatePlugin(connection: Connection): void {
  connection.plugin(autopopulate);
}
