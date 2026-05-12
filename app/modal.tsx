import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';

const STAR_ICON_SIZE = 40;

const StarIcon: React.FC = () => (
  <View style={styles.starContainer}>
    {/* Four-pointed star using two rotated rectangles */}
    <View style={styles.starVertical} />
    <View style={styles.starHorizontal} />
    <View style={[styles.starDiag, { transform: [{ rotate: '45deg' }] }]} />
    <View style={[styles.starDiag, { transform: [{ rotate: '-45deg' }] }]} />
  </View>
);

const PhoneNumberScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    // Handle continue action
    console.log('Phone number submitted:', `+27${phoneNumber}`);
  };
  const router = useRouter();
  const handleSkip = () => {
    // Handle skip action
    router.push('/');
  };

  const formatPhoneNumber = (text: string): string => {
    // Remove non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Format as XX XXX XXXX
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const renderFigmaEmbed = () => {
    const src =
      'https://embed.figma.com/design/zvCqueoUSSM37XhAkvV06U/----Delivery?node-id=80-111&embed-host=share';

    if (Platform.OS !== 'web') {
      return <WebView source={{ uri: src }} style={styles.figmaEmbed} />;
    }

    return React.createElement('iframe', {
      style: { border: '1px solid rgba(0, 0, 0, 0.1)' },
      width: '800',
      height: '450',
      src,
      allowFullScreen: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          {renderFigmaEmbed()}
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter your phone{'\n'}number</Text>
          <Text style={styles.subtitle}>
            By entering your phone number you can log in or create an account.
          </Text>

            {/* Phone Number Input */}
            <TextInput
              style={[styles.phoneInput, isFocused && styles.phoneInputFocused]}
              placeholder="XXX XXX XXXX"
              placeholderTextColor="#AAAAAA"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={12} // XX XXX XXXX = 10 digits + 1 space
              returnKeyType="done"
            />
          </View>
        

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              phoneNumber.length > 0 && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    position: 'relative',
  },
  figmaEmbed: {
    width: 800,
    height: 450,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  skipButton: {
    position: 'absolute',
    right: 24,
    top: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  skipText: {
    marginTop: 24,
    fontSize: 16,
    color: '#888888',
    fontWeight: '400',
  },

  // Star Icon (four-pointed sparkle)
  starContainer: {
    width: STAR_ICON_SIZE,
    height: STAR_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starVertical: {
    position: 'absolute',
    width: 10,
    height: STAR_ICON_SIZE,
    backgroundColor: '#3D3DC8',
    borderRadius: 5,
  },
  starHorizontal: {
    position: 'absolute',
    width: STAR_ICON_SIZE,
    height: 10,
    backgroundColor: '#3D3DC8',
    borderRadius: 5,
  },
  starDiag: {
    position: 'absolute',
    width: 6,
    height: STAR_ICON_SIZE * 0.7,
    backgroundColor: '#3D3DC8',
    borderRadius: 3,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111111',
    lineHeight: 40,
    marginTop: 48,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
    marginBottom: 40,
  },

  // Phone Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  countryCode: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
  },
  phoneInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#222222',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  phoneInputFocused: {
    borderColor: '#0047AB',
    backgroundColor: '#F7F7FF',
    //ios shadow
    shadowColor: '#0047AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //android shadow
    elevation: 10,
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingTop: 12,
  },
  continueButton: {
    backgroundColor: '#8888DD',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#5A5AE8',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default PhoneNumberScreen;