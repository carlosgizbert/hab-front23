import { DefaultTheme } from 'styled-components'

import easy from './custom/easy'

import * as T from './defaultTypes'

declare module 'styled-components' {
  export interface DefaultTheme {
    themeKey: string
    colors: T.IColors
    margin: T.IMargin
    padding: T.IPadding
    borderRadius: T.IBorderRadius
    shadowLevel: T.IShadowLevel
    fontFamily: T.IFontFamily
    fontSize: T.IFontSize
    fontWeight: T.IFontWeight
    gridSpace: T.IGridSpace
    iconSize: T.IDefaultIconsSize
  }
}

type ThemesOptions = {
  [key: string]: DefaultTheme
}

const themes: ThemesOptions = {
  easy,
}

export default themes
