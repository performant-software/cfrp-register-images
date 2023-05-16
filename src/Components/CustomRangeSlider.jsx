import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useConnector } from 'react-instantsearch-hooks-web';
import connectRange from 'instantsearch.js/es/connectors/range/connectRange';

export const useRangeSlider = (props) => {
  return useConnector(connectRange, props);
}

const styles = {
  sliderValues: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
};

const CustomRangeSlider = (props) => {
  const {
    start,
    range,
    refine
  } = useRangeSlider(props);

  const [value, setValue] = useState(null);
  const [valueDisplay, setValueDisplay] = useState({
    min: props.defaultValues.min,
    max: props.defaultValues.max
  });

  useEffect(() => {
    if (value) {
      const [min, max] = value;
      refine([ min, max ]);
    }
  }, [value, refine]);

  useEffect(() => {
    if (
      start[0] !== valueDisplay.min ||
      start[1] !== valueDisplay.max
    ) {
      setValueDisplay({
        min: start[0],
        max: start[1],
      });
      setValue([...start])
    }
  }, [start]);

  const renderValue = (value, type) => {
    let display;

    if (value === Infinity || value === -Infinity) {
      display = type === 'min' ? props.defaultValues.min : props.defaultValues.max;
    } else {
      display = value;
    }

    if (props.renderValue) {
      display = props.renderValue(display)
    }

    return display;
  }

  return (
    <>
      <div style={styles.sliderValues}>
        <span>{renderValue(valueDisplay.min, 'min')}</span>
        <span>{renderValue(valueDisplay.max, 'max')}</span>
      </div>
      <Slider
        range
        defaultValue={[range.min, range.max]}
        onChange={v => setValueDisplay({ min: v[0], max: v[1] })}
        onAfterChange={v => setValue(v)}
        min={props.min}
        max={props.max}
        value={[valueDisplay.min, valueDisplay.max]}
      />
    </>
  );
};

export default CustomRangeSlider;
