import { StyleSheet } from 'react-native';
// import { theme } from '../../theme';

// const { colors } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    // fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    // fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    // color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    // fontSize: AppStyles.fontSize.content,
    // color: AppStyles.color.text,
  },
  loginContainer: {
    // width: AppStyles.buttonWidth.main,
    // backgroundColor: AppStyles.color.tint,
    // borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    // color: AppStyles.color.white,
  },
  placeholder: {
    // fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    // width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    // borderColor: AppStyles.color.grey,
    // borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    // color: AppStyles.color.text,
  },
  facebookContainer: {
    width: 192,
    // backgroundColor: AppStyles.color.facebook,
    // borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    // color: AppStyles.color.white,
  },
  googleContainer: {
    width: 192,
    height: 48,
    marginTop: 30,
  },
  googleText: {
    // color: AppStyles.color.white,
  },
});

export default styles;
