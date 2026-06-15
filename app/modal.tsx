<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
=======
import React, { useState } from 'react';
import {
  View,
  Text,
>>>>>>> d0b1a7c (bingle dingle)
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
<<<<<<< HEAD
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import starIcon from "@/assets/images/Star1.png";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_DURATION = 380;
const CODE_LENGTH = 6;
const EMPTY_CODE = Array(CODE_LENGTH).fill("");

const PhoneNumberScreen: React.FC = () => {
  const [step, setStep] = useState<0 | 1>(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeDigits, setCodeDigits] = useState<string[]>([...EMPTY_CODE]);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [focusedCodeIndex, setFocusedCodeIndex] = useState(0);

  const slideOffset = useSharedValue(0);
  const codeInputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (interval) clearInterval(interval);
      resetTimer();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(60);
  };
  const verificationCode = codeDigits.join("");

  useEffect(() => {
    if (step !== 1) return;

    const timer = setTimeout(() => {
      codeInputRefs.current[0]?.focus();
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [step]);

  const handleContinue = () => {
    if (step === 0) {
      slideOffset.value = withTiming(-SCREEN_WIDTH, {
        duration: SLIDE_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      setStep(1);
      return;
    }

    console.log("Verification code submitted:", verificationCode);
  };

  const handleBack = () => {
    slideOffset.value = withTiming(0, {
      duration: SLIDE_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    setStep(0);
  };

  const handleSkip = () => {
    router.push("/");
  };

  const formatPhoneNumber = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");

    if (cleaned.length <= 5)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(formatPhoneNumber(text));
  };

  const handleCodeDigitChange = (text: string, index: number) => {
    const digits = text.replace(/\D/g, "");

    if (digits.length > 1) {
      const next = [...EMPTY_CODE];
      digits
        .slice(0, CODE_LENGTH)
        .split("")
        .forEach((digit, digitIndex) => {
          next[digitIndex] = digit;
        });
      setCodeDigits(next);

      const focusIndex = Math.min(digits.length, CODE_LENGTH) - 1;
      codeInputRefs.current[focusIndex]?.focus();
      return;
    }

    const digit = digits.slice(-1);
    const next = [...codeDigits];
    next[index] = digit;
    setCodeDigits(next);

    if (digit && index < CODE_LENGTH - 1) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key !== "Backspace") return;

    if (codeDigits[index]) {
      const next = [...codeDigits];
      next[index] = "";
      setCodeDigits(next);

      if (index > 0) {
        codeInputRefs.current[index - 1]?.focus();
      }
      return;
    }

    if (index > 0) {
      const next = [...codeDigits];
      next[index - 1] = "";
      setCodeDigits(next);
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideOffset.value }],
  }));

  const isContinueActive =
    step === 0 ? phoneNumber.length > 0 : verificationCode.length === 6;

=======
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

>>>>>>> d0b1a7c (bingle dingle)
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
<<<<<<< HEAD
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          {step === 1 ? (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#888888" />
            </TouchableOpacity>
          ) : null}

          <Image source={starIcon} style={styles.starIcon} />

          {step === 0 ? (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.contentClip}>
          <Animated.View style={[styles.slideRow, slideStyle]}>
            <View style={styles.stepPanel}>
              <Text style={styles.title}>Enter your phone{"\n"}number</Text>
              <Text style={styles.subtitle}>
                By entering your phone number you can log in or create an
                account.
              </Text>
              <TextInput
                style={[
                  styles.phoneInput,
                  isPhoneFocused && styles.phoneInputFocused,
                ]}
                placeholder="XXX XXX XXXX"
                placeholderTextColor="#AAAAAA"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                maxLength={12}
                returnKeyType="done"
              />
            </View>

            <View style={styles.stepPanel}>
              <Text style={styles.title}>Verify your phone{"\n"}number</Text>
              <Text style={styles.subtitle}>
                We've sent a 6-digit verification code to{" "}
                {phoneNumber || "your phone number"}. Please enter it below to
                continue.
              </Text>
              <View style={styles.codeInputRow}>
                {codeDigits.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      codeInputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.codeInput,
                      focusedCodeIndex === index && styles.codeInputFocused,
                    ]}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleCodeDigitChange(text, index)}
                    onKeyPress={(event) => handleCodeKeyPress(event, index)}
                    onFocus={() => setFocusedCodeIndex(index)}
                    onBlur={() => setFocusedCodeIndex(-1)}
                    maxLength={index === 0 ? CODE_LENGTH : 1}
                    selectTextOnFocus
                    returnKeyType="done"
                  />
                ))}
              </View>
              <Text style={styles.codeText}>
                Didn’t get a code?{" "}
                <Text
                  style={[styles.retry, isActive && styles.codeText]}
                  onPress={toggleTimer}
                >
                  {isActive ? `Resend (${secondsLeft}s)` : "Retry"}
                </Text>
              </Text>
            </View>
          </Animated.View>
        </View>

=======
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
>>>>>>> d0b1a7c (bingle dingle)
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
<<<<<<< HEAD
              isContinueActive && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            activeOpacity={0.85}
            disabled={!isContinueActive}
=======
              phoneNumber.length > 0 && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            activeOpacity={0.85}
>>>>>>> d0b1a7c (bingle dingle)
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
<<<<<<< HEAD
    backgroundColor: "#FFFFFF",
=======
    backgroundColor: '#FFFFFF',
>>>>>>> d0b1a7c (bingle dingle)
  },
  keyboardAvoid: {
    flex: 1,
  },
<<<<<<< HEAD
  codeText: {
    fontWeight: "400",
    color: "#BDBDBD",
    paddingTop: 16,
  },
  retry: {
    color: "#0047AB",
    fontWeight: "400",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 8,
    minHeight: 110, // Gives a stable block for your centered icon
    position: "relative",
  },
  starIcon: {
    resizeMode: "contain",
    width: 90,
    height: 48,
    marginRight: 40,
  },
  backButton: {
    position: "absolute",
    left: 20,
    bottom: 20, // Aligns perfectly on the same visual baseline as the centered star
  },
  skipButton: {
    position: "absolute",
    right: 24,
    bottom: 20,
  },
  skipText: {
    fontSize: 16,
    color: "#888888",
    fontWeight: "400",
  },
  contentClip: {
    flex: 1,
    overflow: "hidden",
  },
  slideRow: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 2,
    flex: 1,
  },
  stepPanel: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 24,
    paddingTop: 13,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: "#111111",
    lineHeight: 40,
    marginTop: 24,
=======

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
>>>>>>> d0b1a7c (bingle dingle)
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
<<<<<<< HEAD
    color: "#888888",
    lineHeight: 20,
    marginBottom: 40,
  },
  phoneInput: {
    backgroundColor: "#F2F2F2",
=======
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
>>>>>>> d0b1a7c (bingle dingle)
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
<<<<<<< HEAD
    color: "#222222",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  phoneInputFocused: {
    borderColor: "#0047AB",
    backgroundColor: "#F7F7FF",
    shadowColor: "#0047AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  codeInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  codeInput: {
    flex: 1,
    marginTop: 18,
    aspectRatio: 0.85,
    maxWidth: 50,
    maxHeight: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#222222",
    textAlign: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
    paddingVertical: 0,
  },
  codeInputFocused: {
    borderColor: "#0047AB",
    backgroundColor: "#F7F7FF",
    shadowColor: "#0047AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 16 : 24,
    paddingTop: 12,
  },
  continueButton: {
    backgroundColor: "#7888DD",
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonActive: {
    backgroundColor: "#0047AB",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
=======
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
>>>>>>> d0b1a7c (bingle dingle)
    letterSpacing: 0.3,
  },
});

<<<<<<< HEAD
export default PhoneNumberScreen;
=======
export default PhoneNumberScreen;
>>>>>>> d0b1a7c (bingle dingle)
