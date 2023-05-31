import React from "react";

// type CustomShowMoreButtonProps = React.ComponentProps<'button'> & {
//     isShowingMore: boolean;
//     translations: CustomShowMoreButtonTranslations;
// };

// export type CustomShowMoreButtonTextOptions = {
//     isShowingMore: boolean;
// };

// export type CustomShowMoreButtonTranslations = {
//     showMoreButtonText(options: CustomShowMoreButtonTextOptions): string;
// };

// export function CustomShowMoreButton({
//     isShowingMore,
//     translations,
//     ...props
// }: CustomShowMoreButtonProps) {
//     return (
//         <button {...props}>
//           {translations.showMoreButtonText({ isShowingMore })}
//         </button>
//     );
// }

const CustomShowMoreButton = ({ isShowingMore, translations, ...props }) => {
    console.log(props);
    return (
    <button {...props}>
        {translations.showMoreButtonText({ isShowingMore })}
    </button>
  );
};

export default CustomShowMoreButton;