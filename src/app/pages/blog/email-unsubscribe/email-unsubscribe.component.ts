import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-email-unsubscribe',
  templateUrl: './email-unsubscribe.component.html',
  styleUrls: ['./email-unsubscribe.component.scss']
})
export class EmailUnsubscribeComponent implements OnInit {

  subsriberId : string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService) { }

  ngOnInit(): void {
    this._getSubscriberID();
  }

  private _unsubscribe(id:string) {
    console.log(id)
    this.emailService.unsubscribe(id).subscribe();
  }

  private _getSubscriberID() {    
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this._unsubscribe(id);
    })
  }

}
