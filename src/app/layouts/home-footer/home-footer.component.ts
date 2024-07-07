import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss','../../../shared/bootstrap.min.css','../../../shared/homestyle.scss']
})
export class HomeFooterComponent implements OnInit {
  currentYear : Number | undefined;
  newsletterForm: FormGroup;
  responseMessage : string = '';
  showSuccessMessage : boolean = false;

  constructor(
    private newsLetterSubscriberService: NewsLetterSubscriberService) {
      this.newsletterForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      }); 
    }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
  }

  subscribe() {
    if (this.newsletterForm.valid) {
      this.newsLetterSubscriberService.add(this.newsletterForm.get('email').value).subscribe(
        (result: Response<boolean>) =>{
          if(result.statusCode === 200) {
            this.responseMessage = "Thank you :)";
            this.showSuccessMessage = true;
            this.newsletterForm.get('email').reset();
          }
          else{
            this.showSuccessMessage = false;
          }
        },
        error => {
          console.error('There was an error:', error);
        }
      );
    }
  }

}
