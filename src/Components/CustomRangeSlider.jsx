import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { connectRange } from 'react-instantsearch-dom';

const RangeSlider = ({ defaultValues, currentRefinement, refine }) => {
  const [value, setValue] = useState(null);
  const [valueDisplay, setValueDisplay] = useState({
    min: defaultValues.min,
    max: defaultValues.max,
  });
  const styles = {
    sliderValues: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
    },
  };

  useEffect(() => {
    if (value) {
      const [min, max] = value;
      refine({ min, max });
    }
  }, [value, refine]);

  useEffect(() => {
    if (
      currentRefinement.min !== valueDisplay.min ||
      currentRefinement.max !== valueDisplay.max
    ) {
      setValueDisplay({
        min: currentRefinement.min,
        max: currentRefinement.max,
      });
      setValue([currentRefinement.min, currentRefinement.max]);
    }
  }, [currentRefinement]);

  return (
    <>
      <div style={styles.sliderValues}>
        <span>{valueDisplay.min}</span>
        <span>{valueDisplay.max}</span>
      </div>
      <Slider
        range
        defaultValue={[defaultValues.min, defaultValues.max]}
        onChange={v => setValueDisplay({ min: v[0], max: v[1] })}
        onAfterChange={v => setValue(v)}
        min={defaultValues.min}
        max={defaultValues.max}
        value={[valueDisplay.min, valueDisplay.max]}
      />
    </>
  );
};

const CustomRangeSlider = connectRange(RangeSlider);

export default CustomRangeSlider;
