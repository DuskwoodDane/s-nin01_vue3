const styleList = ['_light', 'dark', 'macaron', 'darkblue', 'blue', 'grey'];

const changeTheme = (style: string): void => {
  const isHaveStyle = styleList.includes(style);

  document.documentElement.setAttribute('theme', isHaveStyle ? style : '_light');
};

export default changeTheme;