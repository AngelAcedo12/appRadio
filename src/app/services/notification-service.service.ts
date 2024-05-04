import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

type  Notification = {
  message?: string | undefined;
  duration?: number | undefined;
  closeMessage?: string | undefined;
 
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar ) { }

  // Function to open a snackbar with a message and a duration of 2 seconds or a custom duration and a custom close message
  openSnackBarError(optionsNotification : Notification) {

    const { message, duration, closeMessage } = optionsNotification;


    this._snackBar.open(message ?? "", closeMessage ?? "",{
      duration: duration ?? 2000,
   
    });
  }
  
  

}
