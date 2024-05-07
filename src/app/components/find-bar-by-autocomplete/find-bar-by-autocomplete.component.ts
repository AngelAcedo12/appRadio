import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-find-bar-by-autocomplete',
  templateUrl: './find-bar-by-autocomplete.component.html',
  styleUrl: './find-bar-by-autocomplete.component.css'
})
export class FindBarByAutocompleteComponent {

  @Input({required: true }) listKeyWords : string[] = []
  @Output() keyWordSelected = new EventEmitter<string>()
  

  
  keyWordRecomendations : string[] = []
  keyWordActual = ""
  setKeyWordActual(keyWord:string){
    this.keyWordActual = keyWord
    this.getKeyListRecomedations()
  }

  getKeyListRecomedations(){
    if(this.keyWordActual==""){
      this.keyWordRecomendations = []
      return
    }
    this.keyWordRecomendations= this.listKeyWords.filter((keyWord) => keyWord.includes(this.keyWordActual))
   
  }

  selectKeyWord(keyWord:string){
    this.keyWordSelected.emit(keyWord)
    this.keyWordRecomendations = []
  }

}
