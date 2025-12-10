import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { useAppSelector } from '../store/hooks';

type SplashScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Splash'
>;

interface SplashScreenProps {
    navigation: SplashScreenNavigationProp;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                navigation.replace('Feed');
            } else {
                navigation.replace('Login');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation, isAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{STRINGS.appName}</Text>
            <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={styles.loader}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 20,
        textAlign:'center'
    },
    loader: {
        marginTop: 20,
    },
});
