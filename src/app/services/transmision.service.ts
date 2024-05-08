import { Injectable, signal } from '@angular/core';
import { emit } from 'process';
import { Socket, io } from 'socket.io-client';
import { NotificationService } from './notification-service.service';
import { UrlObject } from 'url';

@Injectable({
  providedIn: 'root'
})
export class TransmisionService {

  constructor(private notificationService : NotificationService) { }
  
 socket : Socket | undefined; 

  sockerConected = false;

  audioDetected = signal(false);


  listAudios = signal([] as string[]);

 async conectedSocket(){ 

      this.socket = io('http://localhost:3000');
      this.socket.on('connection',(data)=>{
        console.log(data)
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

       
  
        
        // Esperar a que el audio se cargue antes de reproducirlo

    
    } catch (error) {
        console.error('Error al reproducir el audio:', error);
    }
     
    })
  
  }

  startTransmisionAudio(){
    this.conectedSocket();
    
    navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
      
       let audioStream = stream;
       
       let mediarRecorder = new MediaRecorder(audioStream);
      mediarRecorder.addEventListener('start',()=>{
        console.log('start')
      
      })


      mediarRecorder.ondataavailable = (event) => {
        console.log("Captrurando audio")
       const audioBlob = event.data;
       this.socket?.emit('audio', audioBlob);
      }

       mediarRecorder.start(5000);  
      this.getAudioToSocket();

  }).catch(error => {
      console.error('Error al obtener el acceso al micrófono:', error)});

  }

  



}
