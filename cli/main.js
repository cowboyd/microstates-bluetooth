import React from 'react';
import { render } from 'ink';

import { Store, create, valueOf } from 'microstates';

import noble from '@s524797336/noble-mac';

import UI from './ui';
import Bluetooth from '../src/bluetooth'

let renderer = (...args) => {
  renderer = render(...args).rerender;
};

let initial = create(Bluetooth, {type: 'Off', scan: { type: 'Idle', value: null }, peripherals: {}});

let bluetooth = Store(initial, Effects([currentReference, repaint, bluetoothController, scanController]));

noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    bluetooth.powerOn();
  } else {
    bluetooth.powerOff();
  }
});

noble.on('discover', peripheral => {
  bluetooth.peripherals.put(peripheral.id, peripheral);
});

function Effects(effects) {
  return state => effects.forEach(effect => effect(state));
}

function log(event, cb = x => x) {
  return (...args) => { console.log(`${event}(${args.join(',')})`)}

}

function currentReference(state) {
  bluetooth = state;
}

 function repaint(state) {
   renderer(<UI bluetooth={bluetooth}/>);
 }

function bluetoothController(bluetooth) {
  if (bluetooth.isOn) {
    bluetooth.startScanning();
  }
}

function scanController(bluetooth) {
  let { scan } = bluetooth;
  if (scan.isActivating) {
    let active = scan.activate();
    noble.startScanning([], true);
  } else if (scan.isDeactivating) {
    scan.deactivate();
    noble.stopScanning();
  }
}

repaint(bluetooth);
