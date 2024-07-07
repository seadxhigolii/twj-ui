import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.scss','../../../shared/bootstrap.min.css','../../../shared/homestyle.scss']
})
export class SubscribeModalComponent implements OnInit {
  public showModal: boolean = true;
  public subscribeForm: FormGroup;

  constructor(
    private newsLetterSubscriberService: NewsLetterSubscriberService
  ) {
    this.subscribeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      this.subscribe();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  subscribe() {
    if (this.subscribeForm.valid) {
      this.newsLetterSubscriberService.add(this.subscribeForm.get('email').value).subscribe(
        (result: Response<boolean>) =>{
          if(result.statusCode === 200) {
            this.showModal = false;
          }
        },
        error => {
          console.error('There was an error:', error);
        }
      );
    }
  }

}
