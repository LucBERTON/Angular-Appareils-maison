import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName!: string;
  @Input() appareilStatus!: boolean;
  @Input() indexOfAppareil!: number;
  @Input() id!: number;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
  }

  //callback click bouton éteindre/allumer un appareil
  onSwitch() {
    if (this.appareilStatus === false) {
      this.appareilService.switchOnOne(this.indexOfAppareil);
    } else if (this.appareilStatus === true) {
      this.appareilService.switchOffOne(this.indexOfAppareil);
    }
  }


  getStatus() {
    return this.appareilStatus;
  }

  //couleur du texte en fonction du statut de l'appareil (via ngStyle)
  getColor() {
    if (this.appareilStatus) {
      return "green";
    } else {
    return "red";
    }
  }

}
