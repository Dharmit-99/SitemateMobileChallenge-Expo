import { View, Text, StyleSheet } from 'react-native';
import { NewsArticle } from '../services/types';

interface ArticleListItemProps {
  article: NewsArticle;
}

export const ArticleListItem = ({ article }: ArticleListItemProps) => {
  return (
    <View style={styles.articleContainer}>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleDescription}>{article.description}</Text>
      <Text style={styles.articleSource}>Source: {article.source.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  articleSource: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});