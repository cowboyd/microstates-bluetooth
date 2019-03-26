import Union from '@microstates/union';

import Effect from './effect';
import Peripheral from './peripheral';

export default class Bluetooth {
  get isOn() { return this.power.isActive; }
  get isOff() { return this.power.isInactive; }

  power = Effect.Inactive.create();
  scan = Effect.Inactive.create();

  peripherals = { Peripheral };

  powerOn() {
    return this
      .power.activate();

  }

  powerOff() {
    return this
      .power.reset()
      .scan.reset()
      .peripherals.set({});
  }

  startScanning() {
    return this
      .scan.willActivate();
  }
}
