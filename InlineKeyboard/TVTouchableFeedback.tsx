import React from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface TVTouchableFeedbackProps extends TouchableOpacityProps {
  focusStyles?: StyleProp<ViewStyle>;
}

interface TVTouchableFeedbackState {
  focused: boolean;
}

export default class TVTouchableFeedback extends React.Component<
  TVTouchableFeedbackProps,
  TVTouchableFeedbackState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  onPress = (event: any) => {
    if (event.eventType === 'select' && this.props.onPress) {
      this.props.onPress(event);
    }
  };

  render() {
    const { style, focusStyles } = this.props;

    return (
      <TouchableOpacity
        {...this.props}
        style={[ style, this.state.focused ? focusStyles : {} ]}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPress={this.onPress}
      />
    );
  }
}
