import { Injectable, signal } from '@angular/core';
import { emit } from 'process';
import { Socket, io } from 'socket.io-client';
import { NotificationService } from './notification-service.service';
import { UrlObject } from 'url';

@Injectable({
  providedIn: 'root'
})
export class TransmisionSocketService {

  constructor(private notificationService : NotificationService) { }
  
 socket : Socket | undefined; 

  sockerConected = false;

  audioDetected = signal(false);

  MediaDivice : MediaDevices | undefined;
  MediaRecorder : MediaRecorder | undefined;
  listAudios = signal([] as string[]);
  inAir = signal(false);
 async conectedSocket(nameUserTransmision:string, nameUser? : string | undefined){ 


 
      if(nameUser === undefined){


        this.socket = io('http://localhost:3000',{
          query:{
            nameTransmision: nameUserTransmision,
          }
        });
      }

      if(nameUser != undefined){
        this.socket = io('http://localhost:3000',{
          query:{
            nameTransmision: nameUserTransmision,
            nameUser: nameUser
          }
        });
      }

      this.socket?.on('connection',(data)=>{
        console.log(data)
        this.sockerConected = true;
        this.notificationService.openSnackBar({
          message: "Conectado al servidor", 
          duration: 3000
        });

      });
      if(nameUser != undefined){
      }else{
        if(nameUser === nameUserTransmision){
        
          this.socket?.on("join to transmision", ({userNameJoin}) => {
            
            
            this.notificationService.openSnackBar({
              message: `${userNameJoin} se ha unido a la transmisión`,
              duration: 3000
            })
    
          })
        }
      }
        
    
    
  }


  concatenateArrayBuffers(...buffers: ArrayBuffer[]): ArrayBuffer {
    // Calcular la longitud total de todos los ArrayBuffers
    const totalLength = buffers.reduce((acc, buffer) => acc + buffer.byteLength, 0);
    
    // Crear un nuevo ArrayBuffer con la longitud total
    const concatenatedBuffer = new Uint8Array(totalLength);
    
    // Copiar los contenidos de cada ArrayBuffer en el ArrayBuffer concatenado
    let offset = 0;
    for (const buffer of buffers) {
        concatenatedBuffer.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
    }
    
    return concatenatedBuffer.buffer;
}


  disconectedAudio(){
    this.MediaRecorder?.stop();
    this.MediaRecorder = undefined;
  } 
  getAudioToSocket(){
   
    let bufferAnterior : ArrayBuffer = new Uint8Array();
    let audio = new Audio();
    let oldTime = 0;


    this.socket?.on('audio',async (data)=>{
      bufferAnterior= this.concatenateArrayBuffers(bufferAnterior, data);

      try {
       
        const audioBlob = new Blob([bufferAnterior], { type: 'audio/mp3' });
        
        // Crear una URL Blob a partir del Blob de audio
        const audioBlobUrl = URL.createObjectURL(audioBlob);
        
        audio.src = audioBlobUrl;


        audio.play();

        
        audio.onloadedmetadata = () => {
          console.log('Duración del audio:', audio.currentTime);
         
        }
        audio.onplay = () => {
          setInterval(() => {
            if(audio.currentTime < oldTime){
              audio.currentTime = oldTime;
            }
            console.log('Tiempo actual del audio:', audio.currentTime);
            oldTime = audio.currentTime;
          }, 1000);

          if(audio.currentTime == 0){

          }else{
            audio.currentTime = oldTime;
            audio.play();
          }
         
        }

    } catch (error) {
        console.error('Error al reproducir el audio:', error);
    }
     
    })
  
  }

  startTransmisionAudio(nameUserTransmision:string, nameUser? : string ){
    this.conectedSocket(nameUserTransmision, nameUser);
    this.MediaDivice = navigator.mediaDevices;
   
     this.MediaDivice.getUserMedia({audio:true}).then((stream)=>{
      
       let audioStream = stream;
       this.MediaRecorder = new MediaRecorder(audioStream);
     
        this.MediaRecorder.addEventListener('start',()=>{
        console.log('start')
        
        
      })

      this.MediaRecorder.addEventListener('stop',()=>{
        this.notificationService.openSnackBar({
          message: "Transmisión de audio finalizada", 
          duration: 3000
        })
      })

      this.MediaRecorder.ondataavailable = (event) => {
        console.log("Captrurando audio")
       const audioBlob = event.data;
       this.socket?.emit('audio', audioBlob);
      }
      
        this.MediaRecorder.start(5000);  
     

  }).catch(error => {
      console.error('Error al obtener el acceso al micrófono:', error)});

  }

  

  stopTransmisionAudio(){

    this.socket?.disconnect();
    this.disconectedAudio();
    this.socket?.removeAllListeners();
    this.notificationService.openSnackBar({
      message: "Desconectado del servidor", 
      duration: 3000
    });

  }
  exitToTransmision(){
    this.socket?.disconnect();
    this.socket?.removeAllListeners();
    this.notificationService.openSnackBar({
      message: "Desconectado del servidor", 
      duration: 3000
    });
  }

}
