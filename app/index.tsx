import { useState, useRef } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { ArticleListItem } from "../components/ArticleListItem";
import { SearchHistoryDropdown } from "../components/SearchHistoryDropdown";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useGetTopHeadlines } from "../hooks/useGetTopHeadlines";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { useDelayedSearchHistory } from "../hooks/useDelayedSearchHistory";
import {NewsArticle} from "../types/types";

const keyExtractor = (item: NewsArticle, index: number) => `${item.url}-${index}`

export default function Index() {
    const [searchText, setSearchText] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const { articles: searchArticles, loading: searchLoading, debouncedSearch } = useSearchQuery();
    const { articles: topArticles, loading: topLoading } = useGetTopHeadlines();
    const { searchHistory } = useSearchHistory();
    const { scheduleHistoryAdd, cancelHistoryAdd } = useDelayedSearchHistory();

    const handleTextChange = (text: string) => {
        setSearchText(text);
        debouncedSearch(text);

        // Cancel any pending history addition and schedule a new one
        cancelHistoryAdd();
        scheduleHistoryAdd(text);
    };

    const handleHistorySelect = (historyItem: string) => {
        setSearchText(historyItem);
        setIsInputFocused(false);
        debouncedSearch(historyItem);

        // Cancel pending history addition since this is a selection from history
        cancelHistoryAdd();
    };

    const renderArticle = ({ item }: { item: NewsArticle }) => (
        <ArticleListItem article={item} />
    );

    const articles = searchText.trim() ? searchArticles : topArticles;
    const loading = searchText.trim() ? searchLoading : topLoading;

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.searchInput}
                    placeholder="Search news..."
                    value={searchText}
                    onChangeText={handleTextChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setTimeout(() => setIsInputFocused(false), 150)}
                />
                <SearchHistoryDropdown
                    searchHistory={searchHistory}
                    visible={isInputFocused}
                    onSelectHistory={handleHistorySelect}
                />
            </View>

            {loading && <Text style={styles.loadingText}>Loading...</Text>}

            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={keyExtractor}
                style={styles.articlesList}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                maxToRenderPerBatch={20}
                ListEmptyComponent={
                    !loading ? <Text style={styles.emptyText}>No Articles found</Text> : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: 'white',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 50,
    },
    articlesList: {
        flex: 1,
    },
});
