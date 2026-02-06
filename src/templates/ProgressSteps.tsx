import { CircleAlert, MapPin, Pen, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProgressSteps } from 'react-native-progress-steps';
import { ProgressStep } from 'react-native-progress-steps';
import SmartInput from '../components/molecules/SmartInput';

function ProgresStepTemplate() {
    const [currentStep, setCurrentStep] = useState(0);
    const onNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const onPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const onSubmitSteps = () => {
        alert('All steps completed!');
    };

    let editModeInfo = true;

    return (
        <View style={{ flex: 1 }} className="bg-white  p-1 rounded-lg shadow-lg">
            <ProgressSteps activeStep={currentStep}>
                <ProgressStep
                    label="Step 1"
                    buttonNextText="Next Step"
                    buttonPreviousText="Previous Step"
                    buttonNextTextColor="black"
                    buttonFillColor="#2D2D2D"
                    onNext={onNextStep}
                    onPrevious={onPreviousStep}
                >
                    <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">    
                        {/* Header du bloc */}
                        <View className="flex flex-row justify-between items-center mb-6">
                            <View className="flex-row items-center">
                                <View className="bg-green-50 p-2 rounded-xl">
                                    <User size={20} color="#22c55e" />
                                </View>
                                <Text className="ms-3 text-zinc-800 font-black text-lg">Informations</Text>
                            </View>
                        </View>

                        {/* Liste des Inputs via notre composant intelligent */}
                        <SmartInput icon={User} placeholder="Nom complet" editMode={editModeInfo} />
                        <SmartInput icon={Phone} placeholder="Téléphone" keyboardType="phone-pad" editMode={editModeInfo} />
                        <SmartInput icon={MapPin} placeholder="Adresse" editMode={editModeInfo} />
                        <SmartInput icon={CircleAlert} placeholder="Contact d'urgence" keyboardType="phone-pad" editMode={editModeInfo} />

                    </View>
                </ProgressStep>
                <ProgressStep
                    buttonNextText="Next Step"
                    buttonPreviousText="Previous Step"
                    buttonNextTextColor="black"
                    buttonFillColor="#2D2D2D" label="Step 2" onNext={onNextStep} onPrevious={onPreviousStep}>
                    <View style={{ alignItems: 'center' }} className='flex-1'>
                        <Text>Content for Step 2</Text>
                    </View>
                </ProgressStep>
                <ProgressStep buttonNextText="Next Step"
                    buttonPreviousText="Previous Step"
                    buttonFinishTextColor="black"
                    buttonFillColor="#2D2D2D" label="Step 3" onSubmit={onSubmitSteps} onPrevious={onPreviousStep}>
                    <View style={{ alignItems: 'center' }} className='flex-1'>
                        <Text>Content for Step 3</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

export default ProgresStepTemplate;

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        marginTop: 50,
    },
    nextButton: {
        backgroundColor: '#4CAF50', // vert
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    prevButton: {
        backgroundColor: '#f0f0f0', // gris clair
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    prevButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
});