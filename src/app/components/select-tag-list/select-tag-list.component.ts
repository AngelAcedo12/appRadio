import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountryResult, RadioBrowserApi } from 'radio-browser-api';

@Component({
  selector: 'app-select-tag-list',
  templateUrl: './select-tag-list.component.html',
  styleUrl: './select-tag-list.component.css'
})
export class SelectTagListComponent implements OnInit {
 
  ngOnInit(): void {
    
 }

 tagSherch =new FormControl('')
 

 api : RadioBrowserApi = new RadioBrowserApi("My api")


 tagListShearch : CountryResult[] |undefined
 tagListShearchSelected : CountryResult[] =[]

 async shearchTag(){
  
  if(this.tagSherch.value!.length <=1 || this.tagSherch.value==''){
    console.log("nadad")
    console.log(this.tagSherch.value,this.tagSherch.value?.length )
   this.tagListShearch=[]

  }else{

    var shearch= await this.api.getTags(this.tagSherch.value!)
 
    this.tagListShearch=shearch
  }
    

  }

  selectedTag(item:CountryResult){
    this.tagListShearchSelected?.push(item)
    
  }

}
