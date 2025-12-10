import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface SearchHistoryDropdownProps {
  searchHistory: string[];
  visible: boolean;
  onSelectHistory: (searchTerm: string) => void;
}

export const SearchHistoryDropdown = ({ 
  searchHistory, 
  visible, 
  onSelectHistory 
}: SearchHistoryDropdownProps) => {
  if (!visible || searchHistory.length === 0) {
    return null;
  }

  const renderHistoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.historyItem}
      onPress={() => onSelectHistory(item)}
    >
      <Text style={styles.historyText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropdown}>
      <FlatList
        data={searchHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 56, // Position below the search input
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  list: {
    maxHeight: 200,
  },
  historyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
});