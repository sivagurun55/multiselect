import { Component, OnInit,Input ,OnChanges, Output,EventEmitter} from '@angular/core';
import { Option} from '../option'

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input() countryList:Array<String> = new Array();
  @Input() filter:boolean = true;
  @Input() filterBy:string = '';
  @Output() onChange= new EventEmitter();
  showDropDown:boolean =  false;
  showCountry = new Array();
  searchKeyword: String = '';
  selectedCountry = new Array();
  
  ngOnInit()
  {
    this.showCountry  =  this.setCountry()
  }
  
  showDropdownlist()
  {
    this.showDropDown = true;
    this.showCountry  =  this.setCountry();
  }

  showList(event:any){
    this.setCountry();
    if(this.searchKeyword = ''){
      this.showCountry  =  this.setCountry();
    }
    else{
      this.showCountry = new Array();
      this.countryList.forEach(element => { 
        
        let selectoption:Option = element

        if(selectoption.name.toUpperCase().includes(event.toUpperCase()) && this.filterBy === 'name'){
          this.showCountry.push(selectoption)
          console.log("unwanted")
        }
        else if(selectoption.code.toUpperCase().includes(event.toUpperCase()) && this.filterBy === 'code'){
          this.showCountry.push(selectoption)
        }
        else if((selectoption.name.toUpperCase().includes(event.toUpperCase()) || selectoption.code.toUpperCase().includes(event.toUpperCase())) && this.filterBy === ''){
          this.showCountry.push(selectoption)
        }      
      });
    }
  }

  getSelectedCountry(event:any,country:any){
    if(event.target.checked == true){
      this.selectedCountry.push(country)
      this.onChange.emit({"value":this.selectedCountry})
    }
    else{
      this.selectedCountry.forEach(element=>{
        if(element.name == country.name){
          const index = this.selectedCountry.indexOf(element);
          if (index > -1) {
            this.selectedCountry.splice(index, 1);
          }
        }
      })
    }    
  }

  setCountry()
  {
    if(this.selectedCountry.length !==0){
      this.selectedCountry.forEach(selected=>{
        this.countryList.forEach(element => {       
          if(element.name.toUpperCase().includes(selected.name.toUpperCase()) || element.code.toUpperCase().includes(selected.code.toUpperCase()))
          {
            console.log(this.filterBy,"executed")
            this.countryList[this.countryList.indexOf(element)] = this.setcheckedValue(element)
          }
        })            
      });
    }
    return this.countryList;
  }

  public hasProp(object:object){
    return object.hasOwnProperty('status')?true:false
  }


   setcheckedValue(objelement:any) {
    return {name:objelement.name,code:objelement.code,status:"checked"}
  }

}