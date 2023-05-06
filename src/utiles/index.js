export function getColorByLetter(letter) {
  const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF'];
  let upperLetter = letter.toUpperCase();

  const isAmpersandPresent = alphabets.includes(letter);
  if (isAmpersandPresent) {
    return colors[alphabets.indexOf(upperLetter)];
  } else {
    return '#000000';
  }


}





export function getTwoColorByLetter(letter1, letter2) {
  const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF'];
    
  const upperLetter1 = letter1.toUpperCase();
  const upperLetter2 = letter2.toUpperCase();

  const isLetter1Present = alphabets.includes(upperLetter1);
  const isLetter2Present = alphabets.includes(upperLetter2);
  
  let color1 = '#000000';
  let color2 = '#000000';
  
  if (isLetter1Present) {
    color1 = colors[alphabets.indexOf(upperLetter1)];
  }
  
  if (isLetter2Present) {
    color2 = colors[alphabets.indexOf(upperLetter2)];
  }
  
  return [color1, color2];
}