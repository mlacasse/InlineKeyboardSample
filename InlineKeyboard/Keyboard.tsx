import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LetterButton from './LetterButton';
import lang, { LanguagePack } from './languages/index';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
  },
  inputText: {
    color: 'black',
  },
  letterContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  letterButton: {
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  letterButtonFocus: {
    backgroundColor: 'white',
  },
  letterText: {
    color: 'black',
  },
});

interface InlineKeyboardProps {
  value: string;

  onChange(text: string): any;

  showInput?: boolean;
  letterContainerStyles?: StyleProp<ViewStyle>;
  letterButtonStyles?: StyleProp<ViewStyle>;
  letterButtonFocusStyles?: StyleProp<ViewStyle>;
  letterButtonTextStyles?: StyleProp<TextStyle>;
  language?: string | LanguagePack;
}

interface State {
  showSymbols: boolean;
}

class InlineKeyboard extends React.PureComponent<InlineKeyboardProps, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      showSymbols: false,
    };

    const {
      language = 'EN',
    } = this.props;

    this.languagePack = typeof language === 'string' ? lang(language as string) : language;
  }

  toggleShowSymbols = () => {
    this.setState({ showSymbols: !this.state.showSymbols })
  };

  addLetter = (letter: string) => () => {
    console.log('bob');
    const { value, onChange } = this.props;

    onChange(`${value}${letter}`);
  };

  backspace = () => {
    const { value, onChange } = this.props;

    onChange(value.substring(0, value.length - 1));
  };

  clear = () => {
    const { onChange } = this.props;

    onChange('');
  };

  render() {
    const {
      value,
      showInput = false,
      letterContainerStyles = styles.letterContainer,
      letterButtonStyles = styles.letterButton,
      letterButtonFocusStyles = styles.letterButtonFocus,
      letterButtonTextStyles = styles.letterText,
      language = 'EN',
    } = this.props;

    const letterButtonProps = {
      letterButtonStyles,
      letterButtonFocusStyles,
      letterButtonTextStyles,
    };

    const languagePack = typeof language === 'string' ? lang(language as string) : language;

    return (
      <View>
        {showInput && (
          <View style={styles.input}>
            <Text style={styles.inputText}>{value || 'Type Something'}</Text>
          </View>
        )}
        <View>
          <View style={letterContainerStyles}>
            {languagePack.symbols && (
              <LetterButton
                {...letterButtonProps}
                onPress={this.toggleShowSymbols}
                testID={'symbols-button'}
              >
                123
              </LetterButton>
            )}
            {languagePack.letters.map(letter => {
              return (
                <LetterButton
                  {...letterButtonProps}
                  testID={`letter-${letter}`}
                  key={letter}
                  onPress={this.addLetter(letter)}
                >
                  {letter.toUpperCase()}
                </LetterButton>
              );
            })}
            <LetterButton
              {...letterButtonProps}
              testID={'space-button'}
              onPress={this.addLetter(' ')}
            >
              {'space'.toUpperCase()}
            </LetterButton>
            <LetterButton
              {...letterButtonProps}
              testID={'delete-button'}
              onPress={this.backspace}
            >
              {'backspace'.toUpperCase()}
            </LetterButton>
            <LetterButton {...letterButtonProps} onPress={() => this.clear()}>
              {'clear'.toUpperCase()}
            </LetterButton>
          </View>
          {this.state.showSymbols && languagePack.symbols && (
            <View style={letterContainerStyles} testID={'symbols-container'}>
              {languagePack.symbols.map(letter => {
                return (
                  <LetterButton
                    {...letterButtonProps}
                    testID={`symbol-${letter}`}
                    key={letter}
                    onPress={this.addLetter(letter)}
                  >
                    {letter.toUpperCase()}
                  </LetterButton>
                );
              })}
            </View>
          )}
        </View>
      </View>
    );
  }
};

export default InlineKeyboard;
