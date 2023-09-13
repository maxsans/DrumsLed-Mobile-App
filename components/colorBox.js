import React from 'react';
import { View } from 'react-native';

const ColorBox = ({ color }) => {
  // Convertir la couleur en RGB
  const r = parseInt(color.slice(1,3), 16);
  const g = parseInt(color.slice(3,5), 16);
  const b = parseInt(color.slice(5,7), 16);

  // Calculer la luminosité de la couleur
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Déterminer si la bordure doit être grise
  const borderColor = luminance > 0.5 ? '#000' : '#CCC';

  // Définir le style de la vue
  const boxStyle = {
    backgroundColor: color,
    flex: 1
  };

  return (<View style={boxStyle} />);
};

export default ColorBox;