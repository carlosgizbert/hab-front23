import { DefaultTheme } from 'styled-components'
import { IColors } from '../defaultTypes'
import * as V from '../defaultValues'

const colors: IColors = {
  alert_70: '#FFEE99',
  alert_80: '#FFEE66',
  alert_90: '#FFDD33',
  error_70: '#FFAA99',
  error_80: '#ec6eb2',
  error_90: '#98145b',
  info_70: '#88CCEE',
  info_80: '#6699CC',
  info_90: '#4466BB',
  neutral_70: '#99A4B8',
  neutral_80: '#858DA6',
  neutral_90: '#717693',
  primary_70: '#63BEFF',
  primary_80: '#0085E3',
  primary_90: '#004271',
  secondary_70: '#1BC159',
  secondary_80: '#1BC65B',
  secondary_90: '#0E9C44',
  sucess_70: '#1BC159',
  sucess_80: '#0E9C44',
  sucess_90: '#074e22',
  white: '#FFF',
  black: '#5E6080',
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
