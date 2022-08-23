export type IColors = {
  alert_70: string
  alert_80: string
  alert_90: string
  error_70: string
  error_80: string
  error_90: string
  info_70: string
  info_80: string
  info_90: string
  neutral_70: string
  neutral_80: string
  neutral_90: string
  primary_70: string
  primary_80: string
  primary_90: string
  secondary_70: string
  secondary_80: string
  secondary_90: string
  sucess_70: string
  sucess_80: string
  sucess_90: string
  white: string
  black: string
}

export type IGridSpace = {
  spacing_XSM: string
  spacing_SM: string
  spacing_MD: string
  spacing_LG: string
  spacing_XLG: String
}

type ICommonSize = {
  small: string
  medium: string
  large: string
}

type ITitleSize = {
  large: string
  medium: string
  small: string
}

export type IMargin = {
  size: ICommonSize
}

export type IPadding = {
  size: ICommonSize
}

export type IBorderRadius = {
  border_0: string
  border_2: string
  border_4: string
  border_8: string
  border_full: string
}

export type IShadowLevel = {
  level_1: string
  level_2: string
}

export type IFontFamily = {
  primary: string
  secondary: string
}

export type IFontSize = {
  normal: ICommonSize
  title: ITitleSize
}

export type IFontWeight = {
  light: string
  normal: string
  medium: string
  bold: string
  bolder: string
  extra: string
}

export type IDefaultIconsSize = {
  small: {
    width: string
    height: string
  }
  medium: {
    width: string
    height: string
  }
  large: {
    width: string
    height: string
  }
}
