import { Component } from '@angular/core';

// Supón que existe una forma secreta de ordenar las 26 letras del abecedario inglés, 
// y de asignar un valor numérico a cada una dependiendo del lugar en que se encuentre. 
// Siendo 26 las letras del abecedario inglés (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z), 
// el puntaje de cada letra puede ir de 1 a 26.
// En el caso de una palabra, su puntaje es la suma del puntaje de todas sus letras.

// Por ejemplo, si el orden fuera el abecedario al revés, la Z valdría 26 y la A valdría 1. 
// En ese caso, el valor de la palabra "ZA" sería Z(26) + A(1) = 27, y el valor de la palabra "ZAA" 
// sería Z(26) + A(1)+ A(1) = 28.

// Tú no conoces el orden secreto, y por lo tanto, tampoco el puntaje de cada letra. 
// Crea un programa que diga cuál es el máximo valor que podría tener una palabra.

// Ejemplos:
// A = 26
// AB = 51
// YZ = 51
// EEOOO = 128
// EOEOO = 128
// AGENDAPRO = 206
// FERROCARRIL = 258

// Toma en cuenta:
// - El sistema puede estar programado en el lenguaje y framework que quieras. 
// Puede ser una aplicación de consola o terminal, una aplicación web, una app de escritorio, 
// o una app móvil.
// - No es necesario que gastes tiempo haciendo que la UI sea bonita (si tuviese UI).
// - Sólo lo probaré con palabras escritas las mayúsculas listadas arriba, sin espacios, 
// números, acentos, ni otros caracteres especiales.

// A   B   C   D   E   F   G   H   I   J   K   L   M   N   O   P   Q   R   S   T   U   V   W   X   Y   Z
// 1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26
// 26  25  24  23  22  21  20  19  18  17  16  15  14  13  12  11  10  9   8   7   6   5   4   3   2   1
// 14  13  12  11  10  9   8   7   6   5   4   3   2   1   26  25  24  23  22  21  20  19  18  17  16  15
// 12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  1   2   3   4   5   6   7   8   9   10  11

// 5  + 5  + 15 + 15 + 15
// 22 + 22 + 12 + 12 + 12


// AADEGNOPR
// ACEFILORRRR

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  inputWord: string = "";
  wordValue: number = 0;

  // Count all repeated elements in an array
  private repeatedElements(array: number[], element: number): number {
    let counter = 0;
    for (let item of array) { if (item === element) counter++; }
    return counter;
  }

  // Get value of a word
  private getValue(word: string, invert: boolean = false): number {
    let value: number = 0;
    let sumValue = 26;

    const lettersAscii: number[] = word.split("").map(letter => ((letter?.codePointAt(0) || 0) - 64));
    
    for (let i = invert ? 26 : 1 ; invert ? i >= 1 : i < 26 ; invert ? i-- : i++) {
      const repeated = this.repeatedElements(lettersAscii, i);
      if (repeated > 0) {
        value += (sumValue * repeated);
        sumValue -= 1;
      }
    }

    return value;
  }

  // Calculate max value
  caulculateMaxValue(): void {
    const value = this.getValue(this.inputWord);
    const invertedValue = this.getValue(this.inputWord, true);

    this.wordValue = value > invertedValue ? value : invertedValue;
  }
}