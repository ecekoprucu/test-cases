import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  onPress: () => void;
  item: string;
  userId: string | null;
};

export const UserListItem = ({onPress, item, userId}: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text
        style={item === userId ? styles.selectedText : styles.unselectedText}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectedText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: 'black',
    fontWeight: 'normal',
  },
  wrapper: {
    marginVertical: 5,
    marginRight: 5,
  },
});
