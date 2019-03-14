import { valueOf } from 'microstates';

export default class Peripheral {
  get id() { return valueOf(this).id; }
}
