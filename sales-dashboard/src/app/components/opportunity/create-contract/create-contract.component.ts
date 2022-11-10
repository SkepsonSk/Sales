import {Component, Input, OnInit} from '@angular/core';
import {ObjectService} from "../../../object.service";
import {ToastService} from "../../../service/toast.service";
import {ModalService} from "../../../modal-service.service";

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {
  @Input() objectName : string = '';
  @Input() objectId : string = '';

  opportunityName: string = '';

  quoteList: any;
  selectedQuoteId: string|null = null;

  constructor(
    private objectService: ObjectService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.objectService.retrieveObject('opportunity', this.objectId).subscribe( opportunityData => {
      this.opportunityName = opportunityData.name;
      this.objectService.listObjects('quote', `opportunity='${this.objectId}'`)
        .subscribe( quoteList => {
          this.quoteList = quoteList;
        } );
    } );
  }

  handleCancel() {
    this.modalService.closeModal();
  }

  handleCreateContract() {
    if (this.selectedQuoteId != null) {
      this.objectService.createObject('contract', {
        name: `${this.opportunityName} Contract`,
        type: 'Default',
        status: 'draft',
        opportunity: this.objectId,
        quote: this.selectedQuoteId
      }).subscribe( _ => {
        this.toastService.showToast('success', 'Contract has been created');
        this.modalService.closeModal();
      })
    }
    else {
      this.toastService.showToast('error', 'Select a Quote to create a Contract');
    }
  }
}
