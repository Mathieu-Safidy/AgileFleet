import { ComponentType } from "react";
import { ViewProps, ViewStyle, TextStyle, StyleProp } from "react-native";

declare module "react-native-progress-steps" {
  export const ProgressSteps: ComponentType<
    ViewProps & {
      activeStep?: number;
      nextBtnText?: string;
      previousBtnText?: string;
      finishBtnText?: string;
      nextBtnStyle?: StyleProp<ViewStyle>;
      previousBtnStyle?: StyleProp<ViewStyle>;
      finishBtnStyle?: StyleProp<ViewStyle>;
      nextBtnTextStyle?: StyleProp<TextStyle>;
      previousBtnTextStyle?: StyleProp<TextStyle>;
      finishBtnTextStyle?: StyleProp<TextStyle>;
    }
  >;

  export const ProgressStep: ComponentType<
    ViewProps & {
      label?: string;
      onNext?: () => void;
      onPrevious?: () => void;
      onSubmit?: () => void;
      buttonNextText?: string;
      buttonPreviousText?: string;
      buttonFinishTextColor?: string;
      buttonSubmitTextColor?: string;

    renderNextButton?: () => React.ReactNode;
    renderPreviousButton?: () => React.ReactNode;

      buttonFillColor?: string;
      buttonNextTextColor?: string;
      buttonBorderColor?: string;
      nextBtnTextStyle?: StyleProp<TextStyle>;
      nextBtnText?: string;
      previousBtnText?: string;
      nextBtnStyle?: StyleProp<ViewStyle>;
      previousBtnStyle?: StyleProp<ViewStyle>;
      previousBtnTextStyle?: StyleProp<TextStyle>;
      finishBtnText?: string;
      finishBtnStyle?: StyleProp<ViewStyle>;
      finishBtnTextStyle?: StyleProp<TextStyle>;
    }
  >;
}
