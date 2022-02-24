import { Poem } from '@nx-expo-poetry/models';
import {
  bookmarksActions,
  RootState,
  searchSelectors,
} from '@nx-expo-poetry/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => {
  return {
    searchResultById: (id: string) =>
      searchSelectors.selectSearchResultById(id)(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    bookmark(formattedDate: string, poem: Poem) {
      dispatch(
        bookmarksActions.add({
          formattedDate,
          id: encodeURIComponent(poem.title),
          poem: {
            ...poem,
            lines: poem.lines.slice(0, 1),
          },
        })
      );
    },
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

type PoemResultProps = mapStateToPropsType & mapDispatchToPropsType;

export { mapStateToProps, mapDispatchToProps };
export type { PoemResultProps };
