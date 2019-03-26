import React, { Fragment } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { map, valueOf } from 'microstates';

export default function Scan({ scan }) {
  return (
    <Box>
      <Text bold={true}>Scan:</Text> <Status scan={scan}/>
    </Box>
  )
}

function Status({ scan }) {
  if (scan.isInactive) {
    return <Text italic={true}>Inactive</Text>
  } else {
    return (
      <Fragment>
        <Spinner type="bouncingBall"/>
        {scan.type.state}
      </Fragment>
    );
  }
}
