import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "../object.service";
import {ModalService} from "../modal-service.service";

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit {

  objectName: string | null = '';
  objectTitle: string | null = '';

  objects: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private objectService: ObjectService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {

      this.objectName = params.get('objectName');
      if (this.objectName != null) {
        this.objectTitle = this.objectName.charAt(0).toUpperCase() + this.objectName.slice(1);
        this.listObjects(this.objectName);
      }
    } );
  }

  listObjects(objectName: string): void {
    this.objectService.listObjects(objectName).subscribe( objectList => {
      this.objects = objectList;
    } );
  }

  sendCreateObjectRequest(objectName: string | null) {
    this.modalService.openModal('object-creator', {
      type: 'creator',
      mode: 'create',
      objectName: objectName},
      instance => {
        instance.mode = 'create';
        instance.objectName = this.objectName;
        instance.afterResponse = ( response: any ) => {

          const id = response.id;
          this.router.navigate(['/object', this.objectName, id])
            .catch(err => console.log(err));
          this.modalService.closeModal();
        }
      });
  }
}
