import { useState, } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { useSearchQuery } from "../hooks/useSearchQuery";
import {NewsArticle} from "../services/types";
import { ArticleListItem } from "@/components/ArticleListItem";

const keyExtractor = (item: NewsArticle, index: number) => `${item.url}-${index}`

export default function Index() {
    const [searchText, setSearchText] = useState("");
    const { articles, loading, debouncedSearch } = useSearchQuery();

    const handleTextChange = (text: string) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    const renderArticle = ({ item }: { item: NewsArticle }) => (
        <ArticleListItem article={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search news..."
                    value={searchText}
                    onChangeText={handleTextChange}
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
