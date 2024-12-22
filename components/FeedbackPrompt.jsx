import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../app/context/GlobalProvider'

const FeedbackPrompt = ({ visible, onClose }) => {

    const { addFeedback } = useGlobalContext();
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const addNewFeedback = async () => {
      if (!category.trim() || !content.trim()) return;

      setIsLoading(true);

       const feedback= {
        category: category,
        content: content
       }

       const addedFeedback = await addFeedback (feedback);

       if(addedFeedback) {
        setFeedbackSent (true);
        setCategory('');
        setContent('');
        setTimeout(() => {
          setFeedbackSent(false);
          onClose();
        }, 2000);
       }
       setIsLoading(false);
    }

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {feedbackSent ? (
                  <View style={styles.successMessage}>
                    <Text style={styles.successText}>
                      Thanks for sending feedback!
                    </Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.header}>
                      <Text style={styles.title}>Help make journaling better!</Text>
                      <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                      >
                        <Text style={styles.closeText}>✕</Text>
                      </TouchableOpacity>
                    </View>
  
                    <Text style={styles.subtitle}>
                    Thank you for your feedback! We value every suggestion as we work to improve and add new features—yours could shape the future of Coping.
                    </Text>
  
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                      style={styles.input}
                      value={category}
                      onChangeText={setCategory}
                      placeholder="Enter category"
                    />
  
                    <Text style={styles.label}>Message</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={content}
                      onChangeText={setContent}
                      placeholder="Enter your feedback"
                      multiline
                      numberOfLines={4}
                    />
  
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        (!category.trim() || !content.trim() || isLoading) &&
                          styles.submitButtonDisabled,
                      ]}
                      onPress={addNewFeedback}
                      disabled={!category.trim() || !content.trim() || isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text style={styles.submitText}>Send Feedback</Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

export default FeedbackPrompt

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FEF8EC',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 20,
    color: '#666',
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#01588F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    padding: 20,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
})