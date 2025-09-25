import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  ScrollView, 
  ActivityIndicator
} from 'react-native';
import { Search, Sparkles, X, Send } from 'lucide-react-native';

interface SearchResult {
  answer: string;
  question: string;
}

interface ErrorState {
  message: string;
  visible: boolean;
}

export function AISearchBar() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({ message: '', visible: false });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError({ message: 'Please enter a search query', visible: true });
      return;
    }

    setIsLoading(true);
    setSearchResult(null);
    setError({ message: '', visible: false });

    try {
      const response = await fetch('https://gr-wise-api.euroland.com/api/v2/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_code: 'S-NDA',
          question: searchQuery,
          response_model: '2',
          semantic_count: 3,
          request_source: 'ADNOC Investor Relations App',
          use_translation: true,
          streaming: false,
          use_contextual_ai: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search response:', data);
      
      setSearchResult({
        answer: data.answer || data.response || 'No answer available',
        question: searchQuery
      });
    } catch (error) {
      console.error('Search error:', error);
      setError({ message: 'Failed to search. Please try again.', visible: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearchQuery('');
    setSearchResult(null);
    setError({ message: '', visible: false });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.iconContainer}>
            <Sparkles color="#2563eb" size={20} />
          </View>
          <Text style={styles.searchText}>Get insights faster with AI powered search</Text>
          <Search color="#6b7280" size={20} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.modalIconContainer}>
                <Sparkles color="#2563eb" size={24} />
              </View>
              <Text style={styles.modalTitle}>AI Search</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X color="#6b7280" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Ask anything about ADNOC investor relations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              multiline
              maxLength={500}
              autoFocus
            />
            <TouchableOpacity 
              style={[styles.sendButton, !searchQuery.trim() && styles.sendButtonDisabled]}
              onPress={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Send color="white" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
            {error.visible && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error.message}</Text>
                <TouchableOpacity 
                  style={styles.dismissButton}
                  onPress={() => setError({ message: '', visible: false })}
                >
                  <Text style={styles.dismissButtonText}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            )}

            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#2563eb" size="large" />
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            )}

            {searchResult && (
              <View style={styles.resultCard}>
                <View style={styles.questionContainer}>
                  <Text style={styles.questionLabel}>Your Question:</Text>
                  <Text style={styles.questionText}>{searchResult.question}</Text>
                </View>
                
                <View style={styles.answerContainer}>
                  <Text style={styles.answerLabel}>AI Response:</Text>
                  <Text style={styles.answerText}>{searchResult.answer}</Text>
                </View>
              </View>
            )}

            {!isLoading && !searchResult && (
              <View style={styles.emptyState}>
                <Sparkles color="#9ca3af" size={48} />
                <Text style={styles.emptyStateTitle}>Ask AI about ADNOC</Text>
                <Text style={styles.emptyStateText}>
                  Get instant insights about ADNOC&apos;s financial performance, strategic priorities, and investor relations.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 120,
    marginRight: 12,
    backgroundColor: '#f9fafb',
  },
  sendButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 48,
    minHeight: 48,
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  answerContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 12,
  },
  answerText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  dismissButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dismissButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});