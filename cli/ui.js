import React from 'react';
import { Box, Text } from 'ink';
import Scan from './scan';
import { map, valueOf } from 'microstates';

export default function UI({ bluetooth }) {
  return (
    <Box flexDirection="column">
      <Field label="Bluetooth">{bluetooth.isOn ? "ON" : "OFF" }</Field>
      <Box>
        <Scan scan={bluetooth.scan}></Scan>
      </Box>
      <Field label="Peripherals"/>
      <Box flexDirection="column" paddingLeft={1}>
        {map(bluetooth.peripherals, entry => <Box key={entry.key}><Peripheral peripheral={entry.value}/></Box>)}
    </Box>
      </Box>);
}

function Peripheral({ peripheral}) {
  let { id, rssi, connectable, advertisement } = valueOf(peripheral);
  return (
    <Box flexDirection="column">
      <Field label="id">{id}</Field>
      <Box flexDirection="column" paddingLeft={1}>
        <Field label="rssi">{rssi}</Field>
        <Field label="connectable">{String(connectable)}</Field>
        <Field label="advertisement">{JSON.stringify(advertisement)}</Field>
      </Box>
    </Box>);
}

function Field({ label, children = [] }) {
  return (
    <Box>
      <Text bold={true}>{label}:</Text> <Text>{children}</Text>
    </Box>);
}
