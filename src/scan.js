import { Any } from 'microstates';
import Union from '@microstates/union';

export default Union({
  Idle: Scan => class extends Scan {
    activate() {
      return this.toActivating()
    }
  },
  Activating: Scan => class extends Scan {
    activate() {
      return this.toActive();
    }
  },
  Active: Scan => class extends Scan {
    error = Any;
    activate() {
      return this;
    }
    deactivate() {
      return this.toDeactivating();
    }
  },
  Deactivating: Scan => class extends Scan {
    deactivate() {
      return this.toIdle();
    }
  }
})
