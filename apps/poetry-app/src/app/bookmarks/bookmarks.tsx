import { Poem } from '@nx-expo-poetry/models';
import { BookmarksEntity } from '@nx-expo-poetry/store';
import { Centre, FullHeight } from '@nx-expo-poetry/ui';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Headline, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';

import Bookmark from './bookmark/bookmark';
import {
  mapStateToProps,
  mapDispatchToProps,
  BookmarksProps,
} from './bookmarks.props';

export function Bookmarks({
  bookmarks,
  removeBookmark,
  addBookmark,
}: BookmarksProps) {
  const [showRemoveSnackbar, setShowRemoveSnackbar] = useState<boolean>(false);
  const [currentlyRemovedBookmark, setCurrentlyRemovedBookmark] =
    useState<BookmarksEntity>();

  const onRemoveBookmark = (bookmark: BookmarksEntity) => {
    removeBookmark(bookmark);
    setCurrentlyRemovedBookmark(bookmark);
    setShowRemoveSnackbar(true);
  };

  return (
    <FullHeight>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {bookmarks && bookmarks?.length ? (
            bookmarks.map(
              (bookmark: BookmarksEntity) =>
                bookmark && (
                  <Bookmark
                    formattedDate={bookmark.formattedDate}
                    key={bookmark.id}
                    bookmark={bookmark}
                    removeBookmark={onRemoveBookmark}
                  />
                )
            )
          ) : (
            <Centre>
              <Avatar.Icon
                size={40}
                icon="book-multiple"
                children={undefined}
              />
              <Headline>No poems bookmarked~</Headline>
            </Centre>
          )}
        </ScrollView>
      </SafeAreaView>
      <Snackbar
        visible={showRemoveSnackbar}
        onDismiss={() => setShowRemoveSnackbar(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            if (currentlyRemovedBookmark) {
              addBookmark(currentlyRemovedBookmark);
            }
          },
        }}
      >
        Remove {currentlyRemovedBookmark?.title}
      </Snackbar>
    </FullHeight>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);