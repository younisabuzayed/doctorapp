import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal } from 'react-native';
import Button from '../components/Button';
import {transformName} from '../config/helpers';
import styles from './styles/profileStyles';
import MapView,{Marker } from 'react-native-maps';


const DoctorDetails=({selectedDoctor, closeModal})=> 
{
        if(!selectedDoctor) return null;
        return(
            <Modal
            animationType="slide"
            visible={ selectedDoctor !== null}
            onRequestClose={closeModal} >
                <View style={styles.container}>
                    <View style={styles.userMetaContainer}>
                      <View style={styles.userAvtar}>
                        <Text style={styles.userAvtarText}>
                        {transformName(selectedDoctor.name)}
                        </Text>
                    </View>
                    <View style={styles.userMeta}>
                        <Text>{selectedDoctor.name}</Text>
                        <Text>{selectedDoctor.email}</Text>
                    </View>
                </View>
            
                    <View>
                        <View style={styles.doctorInfo}>
                            <View style={styles.infoCell}>
                                <Text style={styles.infoTitle}>Speialization</Text>
                                <Text style={styles.infoText}>
                                    {selectedDoctor.profile.speialization}
                                </Text>
                            </View>
                            <View style={styles.infoCell}>
                                <Text style={styles.infoTitle}>Address</Text>
                                <Text style={styles.infoText}>
                                    {selectedDoctor.profile.address}
                                </Text>
                            </View>
                            <View style={styles.infoCell}>
                                <Text style={styles.infoTitle}>Working Hours</Text>
                                <Text style={styles.infoText}>
                                    {selectedDoctor.profile.workingHours}
                                </Text>
                            </View>
                            <View style={styles.lastCell}>
                                <Text style={styles.infoTitle}>Phone Number</Text>
                                <Text style={styles.infoText}>
                                    {selectedDoctor.profile.phone}
                                </Text>
                            </View>
                
                        </View>
                    </View>
                        {selectedDoctor.latitude && (
                            <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: selectedDoctor.latitude,
                                        longitude: selectedDoctor.longitude,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                >
                                
                                <Marker coordinate={{latitude: selectedDoctor.latitude, longitude: selectedDoctor.longitude}}  />

                                </MapView>

                            </View>

                        )}
                        <Button
                            text="Back"
                            buttonStyles={styles.backButton}
                            onPress={closeModal}
                        />
                </View>
            </Modal>
        )
    
}

export default DoctorDetails;