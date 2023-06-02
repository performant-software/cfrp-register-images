import React from "react";

const CustomShowMoreButton = ({ isShowingMore, translations, ...props }) => {
    return (
    <button {...props}>
        {translations.showMoreButtonText({ isShowingMore })}
    </button>
  );
};

export default CustomShowMoreButton;