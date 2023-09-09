const colors={
    primary: "#3DF4BD",
  secondary: "#3DA7F4"
} as const 

export const theme = {
    colors,
    space: [0, 4, 8, 16, 24, 32, 64, 126, 256] as const,
  
    typography: {
      fontSize: 16,
      color: colors.primary,
      bodyFontFamily: "Avenir",
      headerFontFamily: "Tiempos"
    } as const
  };
  
  export type Theme = typeof theme;