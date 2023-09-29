import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../servicios/history.service";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-details-history',
  templateUrl: './details-history.component.html',
  styleUrls: ['./details-history.component.css'],
  providers: [ToastrModule]
})
export class DetailsHistoryComponent implements OnInit{

  selecteHistoy: any = {};
  constructor(private router: Router, private historyService: HistoryService, private http: HttpClient,private toastr: ToastrService) {
}

  ngOnInit(): void {
    this.selecteHistoy = this.historyService.getSelectedHistory();
  }

  seeHistory(historyDataForm: NgForm):void{

  }
}
