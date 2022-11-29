import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent {
  invalidSelection = false
  lowercaseSelected = true
  uppercaseSelected = false
  numbersSelected = false
  specialsSelected = false
  length = 8
  passwordGenerated = false
  password = ''
  strongPassword = false
  mediumPassword = false
  weakPassword = false

  
  constructor() {  }

  ngOnInit() {  }

  generatePassword() {
    if (!this.lowercaseSelected && !this.uppercaseSelected && !this.numbersSelected && !this.specialsSelected) {
      this.invalidSelection = true
    } else {
      this.invalidSelection = false
      let availableCharacters = ''
      if (this.numbersSelected) {
        availableCharacters += '0123456789'
      }
      if (this.uppercaseSelected) {
        availableCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      if (this.lowercaseSelected) {
        availableCharacters += 'abcdefghijklmnopqrstuvwxyz'
      }
      if (this.specialsSelected) {
        availableCharacters += '!@#$%^&*'
      }
      if (this.length > 100) {
        this.length = 100
      }

      let entropy = this.length * Math.log2(availableCharacters.length)

      if (entropy >= 50) {
        this.strongPassword = true
        this.mediumPassword = false
        this.weakPassword = false
      } else if (entropy > 25 && entropy < 50) {
        this.strongPassword = false
        this.mediumPassword = true
        this.weakPassword = false
      } else {
        this.strongPassword = false
        this.mediumPassword = false
        this.weakPassword = true
      }

      this.password = Array.from(crypto.getRandomValues(new Uint32Array(this.length))).map((x) => availableCharacters[x % availableCharacters.length]).join('')
      if (this.password != '') {
        this.passwordGenerated = true
      }
    }
  }
}
