import { Injectable, signal } from '@angular/core';
import { emit } from 'process';
import { Socket, io } from 'socket.io-client';
import { NotificationService } from './notification-service.service';
import { UrlObject } from 'url';
import { TransmisionService } from './transmision.service';
import { OauthService } from './oauth.service';
import enviroment from '../../environments/environment';




type opcionConecter = {
  nameTransmision: string,
  type : 'locutor' | 'listener',

}


@Injectable({
  providedIn: 'root'
})

export class TransmisionSocketService {

  constructor(private notificationService : NotificationService, private transmisionService : TransmisionService, private oauthService: OauthService) { }
  
 socket : Socket | undefined; 

  sockerConected = false;

  audioDetected = signal(false);

  MediaDivice : MediaDevices | undefined;
  MediaRecorder : MediaRecorder | undefined;
  listAudios = signal([] as string[]);
  inAir = signal(false);
  yourTransmisionId = signal(''); 


 async conectedSocket(options : opcionConecter){ 


 
      
      if(options.type === 'listener'){
        // Para unirse a una transmision como oyente
        this.socket = io(`${enviroment.base_url_socket}`,{
          query:{
            nameTransmision: options.nameTransmision,
            type:options.type
          }
        });
        console.log('listeenr')
        this.getAudioToSocket();
      }

      if(options.type==='locutor'){
        // Para transmitir audio como locutor
        
        this.socket = io(`${enviroment.base_url_socket}`,{
          query:{
            nameTransmision: options.nameTransmision,
            type:options.type
          }
        });
        
        this.socket?.on("join to transmision", ({userNameJoin}) => {
            
            
          this.notificationService.openSnackBar({
            message: `${userNameJoin} se ha unido a la transmisión`,
            duration: 3000
          })
          
        })
      

      }

      this.socket?.on('connection',(data)=>{
        console.log(data)
        console.log("Conectando al servidor")
        this.notificationService.openSnackBar({
          message: "Conectado al servidor", 
          duration: 3000
        })
      });
      
        this.socket?.on('disconnect',(socket)=>{
          console.log(socket)
          this.exitToTransmision();
          this.notificationService.openSnackBar({
            message: "Desconectado del servidor", 
            duration: 3000
          })

        })
      

      

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
      console.log(data)

      bufferAnterior= this.concatenateArrayBuffers(bufferAnterior, data);

      
      try {
        // Crear un Blob a partir del ArrayBuffer de audio
       
        const audioBlob = new Blob([bufferAnterior], { type: 'audio/wav' });
     
        // Crear una URL Blob a partir del Blob de audio
        const audioBlobUrl = URL.createObjectURL(audioBlob);

        


        console.log(audioBlobUrl, 'audioBlobUrl')
        console.log(audioBlob, 'audioBlob')
        audio.src = audioBlobUrl;

        audio.load();
        audio.play();

        
        audio.onloadedmetadata = () => {
          
          console.log('Duración del audio:', audio.duration);
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

  startTransmisionAudio(nameTransmision:string ){
    this.inAir.update(() => true);
    this.conectedSocket({nameTransmision:nameTransmision,type:'locutor'} );
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
      
        this.MediaRecorder.start(2000);  
     

  }).catch(error => {
      console.error('Error al obtener el acceso al micrófono:', error)});

  }

  
  emitMessageToDisconect(){


    this.socket?.emit('disconect', {message: "Desconectado del servidor"});

  }


  stopTransmisionAudio(){
    
    this.emitMessageToDisconect()
    this.disconectedAudio();
    this.socket?.removeAllListeners();
    this.transmisionService.removeTransmision(this.oauthService.userSave()?.name || '');
    this.notificationService.openSnackBar({
      message: "Desconectado del servidor", 
      duration: 3000
    });

  }
  exitToTransmision(){
   
    this.socket?.removeAllListeners();
    this.notificationService.openSnackBar({
      message: "Desconectado de la transmisión", 
      duration: 3000
    });
  }

}
