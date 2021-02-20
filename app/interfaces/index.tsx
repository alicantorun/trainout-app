export interface Colors {
  transparent: string;
  white: string;
  black: string;
  text: string;
  primary: string;
  success: string;
  error: string;
  background: string;
}

export interface Theme {
  button: {
    backgroundColor: string;
  };
  header: {
    backgroundColor: string;
  };
  colors: Colors;
  screen: {
    width: number;
    height: number;
  };
}

export interface Screens {
  walkthrough: string;
  welcome: string;
  home: string;
  profile: string;
  settings: string;
  register: string;
  login: string;
  authStack: string;
  onboardingStack: string;
  appStack: string;
  drawerStack: string;
  bottomTabStack: string;
  chatroom: string;
  chatroomStack: string;
  chatroomHome: string;
  createChatroom: string;
}
