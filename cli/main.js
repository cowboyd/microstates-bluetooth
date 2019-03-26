import React from 'react';
import { render } from 'ink';

import { Store, create, valueOf } from 'microstates';

import noble from '@s524797336/noble-mac';

import UI from './ui';
import { Effects, Matcher } from './controller';
import Bluetooth from '../src/bluetooth';


let renderer = (...args) => {
  renderer = render(...args).rerender;
};

let initial = create(Bluetooth, {type: 'Off', peripherals: {}});

let controller = Effects([
  currentReference,
  repaint,
  Matcher(bluetooth => bluetooth.isOn, bluetooth => bluetooth.startScanning()),
  Matcher(bluetooth => bluetooth.scan.isActivating, () => noble.startScanning([], true)),
  Matcher(bluetooth => bluetooth.scan.isDeactivating, () => noble.stopScanning())
]);

let bluetooth = Store(initial, controller);

noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    bluetooth.powerOn();
  } else {
    bluetooth.powerOff();
  }
});

noble.on('scanStart', () => bluetooth.scan.didActivate())
noble.on('scanStop', () => bluetooth.scan.didDeactivate())

noble.on('discover', peripheral => {
  bluetooth.peripherals.put(peripheral.id, peripheral);
});

function currentReference(state) {
  bluetooth = state;
}

function repaint(state) {
  renderer(<UI bluetooth={bluetooth}/>);
}

repaint(bluetooth);
