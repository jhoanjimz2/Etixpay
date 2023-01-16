import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-welcome',
  templateUrl: './modal-welcome.component.html',
  styleUrls: ['./modal-welcome.component.scss'],
})
export class ModalWelcomeComponent implements OnInit {

  @Input() modalWelcome: boolean;
  @Output() setModalWelcome: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  continue() {
    this.setModalWelcome.emit(false);
  }

  leave() {
    this.setModalWelcome.emit(false);
    localStorage.setItem('tutorial', 'true');
    this.router.navigate(["/tabs/home"]);
  }

}
