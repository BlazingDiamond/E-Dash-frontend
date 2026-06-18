import starIcon from "@/assets/images/Star1.png";
import mapIcon from "@/assets/images/map-marker-2 1.png";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_DURATION = 380;
const CODE_LENGTH = 6;
const EMPTY_CODE = Array(CODE_LENGTH).fill("");

type OnboardingStep = 0 | 1 | 2 | 3;

const PhoneNumberScreen: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeDigits, setCodeDigits] = useState<string[]>([...EMPTY_CODE]);
  const [focusedField, setFocusedField] = useState<
    "phone" | "name" | "nickname" | null
  >(null);
  const [focusedCodeIndex, setFocusedCodeIndex] = useState(0);

  const slideOffset = useSharedValue(0);
  const codeInputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
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

  const slideToStep = (nextStep: OnboardingStep) => {
    slideOffset.value = withTiming(-SCREEN_WIDTH * nextStep, {
      duration: SLIDE_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    setStep(nextStep);
  };

  const handleContinue = () => {
    if (step === 0) {
      slideToStep(1);
      return;
    }

    if (step === 1) {
      slideToStep(2);
      return;
    }

    if (step === 2) {
      slideToStep(3);
      return;
    }

    router.push("/");
  };

  const handleBack = () => {
    if (step === 3) {
      slideToStep(2);
      return;
    } else if (step === 2) {
      slideToStep(1);
      return;
    }

    slideToStep(0);
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
  const handleNameChange = (text: string) => {
    setName(text);
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
    step === 0
      ? phoneNumber.length > 0
      : step === 1
      ? verificationCode.length === 6
      : step === 2
      ? name.length > 0 && nickname.length > 0
      : true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          {step > 0 ? (
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
                  focusedField === "phone" && styles.phoneInputFocused,
                ]}
                placeholder="XXX XXX XXXX"
                placeholderTextColor="#AAAAAA"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
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

            <View style={styles.stepPanel}>
              <Text style={styles.title}>What should we call{"\n"}you?</Text>
              <Text style={styles.subtitle}>
                This is how you'll appear to your driver and on{"\n"}your
                profile.
              </Text>
              {/* Your permanent, styleable text */}
              <Text style={styles.prefixText}>First Name</Text>
              <TextInput
                style={[
                  styles.inputContainer,
                  focusedField === "name" && styles.inputContainerFocused,
                ]}
                placeholder="Enter your full name"
                placeholderTextColor="#AAAAAA"
                keyboardType="default"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                returnKeyType="done"
              />
              <Text style={styles.prefixText}>Nickname</Text>
              <TextInput
                style={[
                  styles.inputContainer,
                  focusedField === "nickname" && styles.inputContainerFocused,
                ]}
                placeholder="Your prefered name"
                placeholderTextColor="#AAAAAA"
                keyboardType="default"
                value={nickname}
                onChangeText={setNickname}
                onFocus={() => setFocusedField("nickname")}
                onBlur={() => setFocusedField(null)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.stepPanel}>
              <Text style={styles.title}>Find Your Local{"\n"}Favorites</Text>
              <Text style={styles.subtitle}>
                This helps us show you restaurants in your area and ensures your
                driver finds the right spot.
              </Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <Image
            source={mapIcon}
            style={[styles.mapIcon, { display: step === 3 ? "flex" : "none" }]}
          />
          <TouchableOpacity
            style={[
              styles.continueButton,
              isContinueActive && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            activeOpacity={0.85}
            disabled={!isContinueActive}
          >
            <Text style={styles.continueText}>
              {step === 3 ? "Share Location" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoid: {
    flex: 1,
  },
  codeText: {
    fontWeight: "400",
    color: "#BDBDBD",
    paddingTop: 24,
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
  mapIcon: {
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 200,
    width: 167,
    height: 160,
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
    width: SCREEN_WIDTH * 3,
    flex: 1,
  },
  stepPanel: {
    gap: 8,
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    lineHeight: 20,
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#222222",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputContainerFocused: {
    borderColor: "#0047AB",
    backgroundColor: "#F7F7FF",
    shadowColor: "#0047AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  prefixText: {
    fontSize: 16,
    color: "#222222",
    fontWeight: "600",
  },
  nameInput: {
    backgroundColor: "#F2F2F2",
    fontSize: 16,
    color: "#222222",
  },

  phoneInput: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
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
    letterSpacing: 0.3,
  },
});

export default PhoneNumberScreen;
