import { Injectable, signal } from '@angular/core';
import { emit } from 'process';
import { Socket, io } from 'socket.io-client';
import { NotificationService } from './notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class TransmisionService {

  constructor(private notificationService : NotificationService) { }
  
 socket : Socket | undefined; 

  sockerConected = false;

  audioDetected = signal(false);


 async conectedSocket(){ 

      this.socket = io('http://localhost:3000');
      this.socket.on('connection',()=>{
        console.log('conected');
        this.sockerConected = true;
        this.notificationService.openSnackBar({
          message: "Conectado al servidor", 
          duration: 3000
        });

      });
    
  }

  sendMessage(message:string){
    this.socket?.emit('message',message);
  }


  getAudioToSocket(){
    this.conectedSocket();
    this.socket?.on('audio',(stream)=>{
      let audio = new Audio();
      audio.srcObject = stream;
      audio.play();
    })
  
  }

  startTransmisionAudio(){
    this.conectedSocket();

    navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
      
       let audioStream = stream;
       
       let mediarRecorder = new MediaRecorder(audioStream, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 128000,

       });

      mediarRecorder.addEventListener('start',()=>{
        console.log('start')
      
      })


       mediarRecorder.ondataavailable = (event) => {
        console.log('data available')
        const auidioBlob = event.data;
        const audioUrl = URL.createObjectURL(auidioBlob);
        this.notificationService.openSnackBar({
          message: "Audio grabado con exito", 
          duration: 3000
        });
        this.socket?.emit('audio',audioUrl);
       }

       mediarRecorder.start();  
       

  }).catch(error => {
      console.error('Error al obtener el acceso al micrófono:', error)});

  }

  



}
