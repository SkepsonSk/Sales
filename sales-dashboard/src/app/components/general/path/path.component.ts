import {Component, Input, OnInit} from '@angular/core';
import {PathData} from "../../../model/path-data";
import {PathService} from "../path.service";
import {ObjectService} from "../../../object.service";
import {ToastService} from "../../../service/toast.service";

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {

  @Input() pathName: string = '';
  @Input() fieldName: string = '';
  @Input() objectData: any;
  @Input() objectName: string = '';

  pathData: PathData[] = [];
  currentIndex: number = 0;

  constructor(
    private pathService: PathService,
    private objectService: ObjectService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData().then(_ => {});
  }

  async loadData() {
    this.objectService.retrieveObjectFields(this.objectName, this.objectData.id, [this.fieldName])
      .subscribe( objectData => {
        this.objectData = objectData;
        this.pathService.getPathData(this.pathName)
          .subscribe( pathData => {
            this.pathData = pathData;
            this.determineCurrentIndex();
          } );
      } );
  }


  determineCurrentIndex(): void {
    this.currentIndex = 0;
    for (let i = 0 ; i < this.pathData.length ; i++) {
      if (this.pathData[i].name == this.objectData[this.fieldName]) {
        break;
      }
      else {
        this.currentIndex++;
      }
    }
  }

  handleSelection(path: string) {
    if (this.fieldName != path) {
      this.objectData[this.fieldName] = path;
      this.determineCurrentIndex();

      let data: any = {};
      data[this.fieldName] = path;

      this.objectService.editObject('opportunity', this.objectData.id, data)
        .subscribe(result => {
          this.toastService.showToast('success', 'Record has been updated.');

        }, err => {
            const errorMessage = err.error?.error != null ? err.error.error : 'An error occurred.';
            this.toastService.showToast('error', errorMessage);
        });
    }
  }
}
