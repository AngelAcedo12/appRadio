import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ImgSelect } from '../../models/imgSelect';


@Component({
  selector: 'app-img-selected',
 
  templateUrl: `imgSelected.component.html`,
  styleUrl: './imgSelected.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgSelectedComponent { 

  @Output() setImgSelected = new EventEmitter<string>();

  imgSlected = 0;

  imagenes : ImgSelect[] = [
    {imgSlected: 0, imgUrl: "../../../assets/profile/0.webp"},
    {imgSlected: 1, imgUrl: "../../../assets/profile/1.webp"},
    {imgSlected: 2, imgUrl: "../../../assets/profile/2.webp"},
    {imgSlected: 3, imgUrl: "../../../assets/profile/3.webp"},
    {imgSlected: 4, imgUrl: "../../../assets/profile/4.webp"},
    {imgSlected: 5, imgUrl: "../../../assets/profile/5.webp"},
    {imgSlected: 6, imgUrl: "../../../assets/profile/6.webp"},
    {imgSlected: 7, imgUrl: "../../../assets/profile/7.webp"},
    {imgSlected: 8, imgUrl: "../../../assets/profile/8.webp"},
    {imgSlected: 9, imgUrl: "../../../assets/profile/9.webp"},
    {imgSlected: 10, imgUrl: "../../../assets/profile/10.webp"},
    {imgSlected: 11, imgUrl: "../../../assets/profile/11.webp"},
  ]

  onSelect(number: number){
    if(this.imgSlected === number) return
    document.getElementById(number.toString())?.classList.replace("imgNotSelected", "imgSelected")
    document.getElementById(this.imgSlected.toString())?.classList.replace("imgSelected", "imgNotSelected")
    this.imgSlected= number
    this.setImgSelected.emit(number.toString())
  }

}
