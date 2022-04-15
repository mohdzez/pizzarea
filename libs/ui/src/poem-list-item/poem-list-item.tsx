import { Poem } from '@nx-expo-poetry/models';

import React from 'react';
import { Divider, List } from 'react-native-paper';

export interface PoemListItemProps {
  poem: Poem;
  onPress: () => void;
}

export function PoemListItem({ poem, onPress }: PoemListItemProps) {
  return (
    poem && (
      <>
        <List.Item
          title={poem.title}
          descriptionNumberOfLines={3}
          description={
            poem.author +
            '\n' +
            poem.lines?.[0] +
            ' ' +
            poem.lines?.[1] +
            ' ...'
          }
          descriptionEllipsizeMode="tail"
          onPress={onPress}
        />
        <Divider />
      </>
    )
  );
}

export default PoemListItem;
