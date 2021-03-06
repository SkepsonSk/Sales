import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../client.service";
import {ToastService} from "../../../service/toast.service";
import {NavigationService} from "../../../service/navigation.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @Input() object: any;

  constructor(
    private clientService: ClientService,
    private toastService: ToastService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
  }

  acceptClient(): void {
    this.clientService.acceptClient(this.object.id)
      .subscribe(
        okData => {
          const opportunityId = okData.opportunity;

          this.toastService.showToast('success', 'Client has been accepted.');
          this.navigationService.navigateObject('opportunity', opportunityId);
        },

        err => {
          this.toastService.showToast('error', err.error.error);
          console.log(err);
        }
        );
  }

}
