import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// Dummy Notification Data
const notifications = [
    {
      id: '1',
      title: 'Appointment Reminder',
      description: 'Your appointment with Dr. Smith is scheduled for tomorrow at 10:00 AM.',
      timestamp: '2024-11-26 09:00 AM',
    },
    {
      id: '2',
      title: 'New Message',
      description: 'You have received a new message from the Alumni Coordinator.',
      timestamp: '2024-11-25 03:45 PM',
    },
    {
      id: '3',
      title: 'Event Invitation',
      description: 'Join us for the upcoming Alumni Meetup on December 1st at 6:00 PM.',
      timestamp: '2024-11-24 01:30 PM',
    },
    {
      id: '4',
      title: 'Profile Update',
      description: 'Your profile details have been successfully updated.',
      timestamp: '2024-11-23 11:15 AM',
    },
    {
        id: '5',
        title: 'Appointment Reminder',
        description: 'Your appointment with Dr. Smith is scheduled for tomorrow at 10:00 AM.',
        timestamp: '2024-11-26 09:00 AM',
      },
  ];

function NotificationScreen(){
    const renderNotification = ({ item }) => (
        <TouchableOpacity style={styles.notificationCard} activeOpacity={0.7}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDescription}>{item.description}</Text>
          <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
        </TouchableOpacity>
      );
    
      return (
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Notifications</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );

}


export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', // Dark theme background
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
    },
    listContent: {
      paddingBottom: 20,
    },
    notificationCard: {
      backgroundColor: '#1e1e1e', // Dark card background
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    notificationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1DA1F2', // Highlighted title color
      marginBottom: 8,
    },
    notificationDescription: {
      fontSize: 14,
      color: '#ccc',
      marginBottom: 10,
    },
    notificationTimestamp: {
      fontSize: 12,
      color: '#888',
      textAlign: 'right',
    },
  });
  
  