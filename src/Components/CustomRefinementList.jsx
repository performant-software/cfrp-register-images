import React from 'react';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import ItemCountBar from './ItemCountBar';

import _ from 'underscore';

function CustomRefinementList(props) {
  const { items, refine } = useRefinementList(props);

  const maxCount = Math.max(..._.map(items, (item) => item.count));

  return (
    <div>
        <ul className={'ais-RefinementList-list'}>
          {items.map((item) => (
            <li
              key={item.value}
              className={`ais-RefinementList-item ${item.isRefined && 'ais-RefinementList-item--selected'}`}
            >
              <label
                className={'ais-RefinementList-label'}
              >
                <input
                  checked={item.isRefined}
                  className={'ais-RefinementList-checkbox'}
                  type="checkbox"
                  value={item.value}
                  onChange={() => refine(item.value)}
                />
                <span
                  className={'ais-RefinementList-labelText'}
                  style={{
                    width: '20%'
                  }}
                >
                  {item.label}
                </span>
                <ItemCountBar
                 widthPercent={Math.round(40*item.count/maxCount)}
                 count={item.count}
              />
              </label>
            </li>
          ))}
        </ul>
        {/* {showMore && (
        <ShowMoreButton
          className={`ais-RefinementList-showMore ${!canToggleShowMore && 'ais-RefinementList-showMore--disabled'}`}
          disabled={!canToggleShowMore}
          onClick={onToggleShowMore}
          isShowingMore={isShowingMore}
          translations={translations}
        />
      )} */}
    </div>
  );
}

export default CustomRefinementList;