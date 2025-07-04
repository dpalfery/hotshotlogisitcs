
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  ScrollView, 
  StyleSheet, 
  Alert,
  TouchableOpacity 
} from 'react-native';

export default function DriverHome({ navigation }) {
  const [activeJobs] = useState([
    {
      id: 'JOB001',
      pickup: '123 Main St, City A',
      dropoff: '456 Oak Ave, City B',
      status: 'assigned',
      priority: 'high'
    },
    {
      id: 'JOB002', 
      pickup: '789 Pine Rd, City C',
      dropoff: '321 Elm St, City D',
      status: 'in_progress',
      priority: 'medium'
    }
  ]);

  const handleJobAction = (jobId, action) => {
    // Input validation
    if (!jobId || typeof jobId !== 'string') {
      Alert.alert('Error', 'Invalid job ID');
      return;
    }

    // Secure action handling
    const validActions = ['start', 'complete', 'cancel', 'view'];
    if (!validActions.includes(action)) {
      Alert.alert('Error', 'Invalid action');
      return;
    }

    Alert.alert(
      'Job Action',
      `${action.charAt(0).toUpperCase() + action.slice(1)} job ${jobId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            // TODO: Implement secure API call
            console.log(`Job ${jobId} ${action} confirmed`);
          }
        }
      ]
    );
  };

  const renderJob = (job) => (
    <View key={job.id} style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobId}>Job: {job.id}</Text>
        <Text style={[styles.priority, styles[`priority${job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}`]]}>
          {job.priority.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.location}>From: {job.pickup}</Text>
      <Text style={styles.location}>To: {job.dropoff}</Text>
      <Text style={styles.status}>Status: {job.status.replace('_', ' ').toUpperCase()}</Text>
      
      <View style={styles.actionButtons}>
        {job.status === 'assigned' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.startButton]}
            onPress={() => handleJobAction(job.id, 'start')}
          >
            <Text style={styles.buttonText}>Start Job</Text>
          </TouchableOpacity>
        )}
        {job.status === 'in_progress' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => handleJobAction(job.id, 'complete')}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleJobAction(job.id, 'view')}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Driver Dashboard</Text>
      <Text style={styles.subtitle}>Active Jobs</Text>
      
      {activeJobs.length > 0 ? (
        activeJobs.map(renderJob)
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No active jobs assigned</Text>
        </View>
      )}
      
      <View style={styles.bottomActions}>
        <Button 
          title="Refresh Jobs" 
          onPress={() => {
            // TODO: Implement secure refresh mechanism
            Alert.alert('Info', 'Refreshing job list...');
          }} 
        />
        <Button 
          title="Update Location" 
          onPress={() => {
            // TODO: Implement secure location update
            Alert.alert('Info', 'Location updated');
          }} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#666'
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  jobId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold'
  },
  priorityHigh: {
    backgroundColor: '#ffebee',
    color: '#c62828'
  },
  priorityMedium: {
    backgroundColor: '#fff3e0',
    color: '#ef6c00'
  },
  priorityLow: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32'
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  status: {
    fontSize: 14,
    color: '#2196f3',
    fontWeight: '600',
    marginBottom: 15
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 90
  },
  startButton: {
    backgroundColor: '#4caf50'
  },
  completeButton: {
    backgroundColor: '#2196f3'
  },
  viewButton: {
    backgroundColor: '#757575'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic'
  },
  bottomActions: {
    marginTop: 30,
    gap: 15
  }
});