import Union from '@microstates/union';

import Scan from './scan';
import Peripheral from './peripheral';

class Bluetooth {
  scan = Scan.Idle.create();
  peripherals = { Peripheral };
}

export default Union({
  On: Bluetooth => class extends Bluetooth {

    startScanning() {
      return this.scan.activate();
    }

    stopScanning() {
      return this.scan.stop();
    }

    powerOn() {
      return this;
    }

    powerOff() {
      return this
        .scan.deactivate()
        .peripherals.set({})
        .toOff();
    }
  },
  Off: Bluetooth => class extends Bluetooth {
    powerOn() {
      return this.toOn();
    }
    powerOff() {
      return this;
    }
  }
}, Bluetooth);
