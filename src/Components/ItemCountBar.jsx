import React from 'react';

function ItemCountBar(props) {
    const useWidth = props.widthPercent.toString()+'%';

    return (
      <span style={{
        width: useWidth,
        lineHeight: '1.5em',
        background: 'orange',
        paddingLeft: '5px'
      }}>
        {props.count}
        </span>
    );
}

export default ItemCountBar;