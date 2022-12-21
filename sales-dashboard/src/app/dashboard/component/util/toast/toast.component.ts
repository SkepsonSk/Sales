import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from "../../../service/toast/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  visible: boolean = false;
  type: string = 'error';
  message: string = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getData().subscribe( toastData => {
      this.type = toastData.type
      this.message = toastData.message;
      this.visible = true;

      setTimeout( () => {
        this.handleClosingClick();
      }, 5000 );
    } );
  }

  handleClosingClick() {
    this.visible = false;
  }

}
