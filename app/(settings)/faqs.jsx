import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.question}>{question}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

const FAQList = ({ faqs }) => {
  return (
    <FlatList
      data={faqs}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <FAQItem question={item.question} answer={item.answer} />}
    />
  );
};

// Sample Usage
const FAQsPage = () => {
  const faqData = [
    { question: 'What is Coping.ai?', answer: 'Coping.ai is your personal diary powered up by AI, making it an amazing tool for journaling and improving mental health.' },
    { question: 'How to use Coping.ai?', answer: 'Imagine getting a prompt every time you want to make an entry to your diary. With Coping.ai, you will spend more time writing than thinking about what to write. Not only is it efficient, it is personal and insightful. Coping.ai asks you questions and helps you make most of your memories and feelings. Explore different themes and build an everlasting habit of journaling.' },
    { question: 'How do I connect to get help or support?', answer: 'You can either use the feeback form on the settings page or contact us here: coping.ai.app@gmail.com' },
    { question: 'How secure is my data?', answer: 'When you login to coping you only give us your email, we use industry standard encryption to keep any data from leaking.' },
    { question: 'Is this app free?', answer: 'Yes, the app is free to use. You will get 10 free entries every week. We only charge to remove limits to help with the cost of operations.' },
    { question: 'How is AI integrated into Journaling on Coping?', answer: 'AI plays an important but limited role to help you with journaling or mood tracking. As you begin making an entry, AI will help you structure your thoughts by asking you relevant questions. At the end of the session, you will recieve a customised journaling prompt.' },
    { question: 'Does this mean my entry is shared with AI?', answer: 'No! Your actual journal entry is not shared with any third party services. The role of AI on Coping is limited to creating a customised journaling prompt for you. Your entry beyond that is securely stored in the app.' },
    { question: 'What can I customise on Coping?', answer: 'We aim to offer you maximum flexibility. For now you can change the maximum number of questions you want AI to ask you before creating a prompt for you.'},
    { question: 'I do not like something about Coping, what can I do?', answer: 'Coping is a young app and we are activiely looking to improve based on your feedbacks. Please use the feedback section and we will try our best to include your suggestions as soon as possible.'},
    { question: 'How can I change my password?', answer: 'Click on Forget Password on the Login screen to get a link to reset your password.'},
  ];

  return (
    
    <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={()=> {router.back()}}>
        <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
      <Text style={styles.header}>FAQs</Text>
      <Text style={{fontSize:15, fontStyle:'cLight', textAlign:'center', marginBottom:15,}}>Tap on a question to expand</Text>
      <FAQList faqs={faqData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#FEF8EC",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: RFPercentage(3), 
    fontFamily:'bSemi'
  },
  faqItem: {
    marginBottom: 15,
    marginHorizontal:10,
    backgroundColor: '#FFEECD',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});

export default FAQsPage;
