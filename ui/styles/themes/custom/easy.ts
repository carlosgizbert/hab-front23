import { DefaultTheme } from 'styled-components'
import { IColors } from '../defaultTypes'
import * as V from '../defaultValues'

const colors: IColors = {
  alert_70: '#FFEE99',
  alert_80: '#FFEE66',
  alert_90: '#FFDD33',
  error_70: '#FFAA99',
  error_80: '#FF7766',
  error_90: '#FF4433',
  info_70: '#88CCEE',
  info_80: '#6699CC',
  info_90: '#4466BB',
  neutral_70: '#E6E9F2',
  neutral_80: '#C2C4CC',
  neutral_90: '#A1A3AA',
  primary_70: '#38ACFF',
  primary_80: '#0085E3',
  primary_90: '#005A9A',
  secondary_70: '#1BC159',
  secondary_80: '#1BC65B',
  secondary_90: '#0E9C44',
  sucess_70: '#1BC159',
  sucess_80: '#0E9C44',
  sucess_90: '#0E9C44',
  white: '#FFF',
  black: '#070707',
}

const easy: DefaultTheme = {
  themeKey: 'easy',
  margin: V.IMarginDefault,
  padding: V.IPaddingDefault,
  borderRadius: V.IBorderRadiusDefault,
  shadowLevel: V.IShadowLevelDefault,
  fontFamily: V.IFontFamilyDefault,
  fontSize: V.IFontSizeDefault,
  fontWeight: V.IFontWeightDefault,
  gridSpace: V.IGridSpace,
  iconSize: V.IDefaultIconsSize,
  colors,
}

export default easy
