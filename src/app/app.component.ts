import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  expressionScreen: string = '';
  resultScreen: string = '';
  newFirstResult: boolean = true;

  elements: string[] = [];
  numA: number = 0;
  numB: number = 0;
  operator: string = '';

  // Añade a la expresión matemática el valor correspondiente
  addToExpression(value: string) {

    if (this.isOperator(value)) {
      
      // Nos aseguramos de que no se pueda insertar un operador como primer digito en el primer cálculo
      if (this.newFirstResult && this.expressionScreen == '') {
        alert('Porfavor ingresa un número como mínimo antes de un operador en el primer cálculo.');
        return;
        
        // Nos aseguramos que solo se haga una operacion a la vez
      } else if (this.operatorExists()) {
        alert('Porfavor calcule el resultado de la expresión actual antes de añadir otro operador.');
        return;
      }

    } else {
      
      // Nos aseguramos de que no se pueda insertar un número como primer digito si no es el primer cálculo
      if (!this.newFirstResult && this.expressionScreen == '') {
        alert('Porfavor ingresa un operador antes del número, recuerda que ya tienes un valor acumulado para seguir operando con él.');
        return;
      }
    }

    this.expressionScreen += value;
  }

  // Limpia la pantalla y los valores de las variables
  clearScreen(): void {
    this.expressionScreen = '';
    this.resultScreen = '';

    this.elements = [];
    this.numA = 0;
    this.numB = 0;
    this.operator = '';

    this.newFirstResult = true;
  }

  // Comprueba si hay un operador en el valor que le pasamos
  isOperator(value: string): boolean {
    return value == '/' || value == '*' || value == '-' || value == '+';
  }

  // Comprueba si ya existe un operador en la expresión matemática actual
  operatorExists(): boolean {
    let exists: boolean = false;
    const operators: string[] = ['/', '*', '-', '+'];

    operators.forEach(element => {
      if (this.expressionScreen.indexOf(element) != -1) {
        exists = true;
      }
    });

    return exists;
  }

  // Recoge los valores y llama a la función de operar, ademas de mostrar el resultado por pantalla
  calculate(): void {

    // Nos aseguramos de que se introduzca algo para poder calcular
    if (this.expressionScreen == '') {
      alert('Porfavor introduzca alguna expresión matemática.');
      return;
    }

    // Separamos los valores y los añadimos a las variables correspondientes
    this.elements = this.expressionScreen.split(/([+\-*\/])/);

    if (this.newFirstResult) {
      this.numA = Number(this.elements[0]);
      this.numB = Number(this.elements[2]);
      this.operator = this.elements[1];

    } else {
      this.numB = Number(this.elements[2]);
      this.operator = this.elements[1];
    }

    // Llamamos a la función operar y mostramos el resultado
    this.operate();
    this.resultScreen = this.numA + '';
    
    // Limpiamos la expresión de la pantalla e indicamos que ya no es el primer resultado
    this.expressionScreen = '';
    this.newFirstResult = false;
  }

  // Hacemos la operacion y sobreescribimos el numA para ir acumulando el resultado
  operate() {

    switch (this.operator) {
      case '/':
        this.numA = this.numA / this.numB;
        break;
    
      case '*':
        this.numA = this.numA * this.numB;
        break;

      case '-':
        this.numA = this.numA - this.numB;
        break;

      case '+':
        this.numA = this.numA + this.numB;
        break;
    }
  }
}
