import { Component, Input, OnInit } from "@angular/core";
import * as countdown from "countdown";
import { Time } from "@angular/common";
import * as moment from "moment";

@Component({
  selector: "app-reloj-regresivo",
  templateUrl: "./reloj-regresivo.component.html",
  styleUrls: ["./reloj-regresivo.component.scss"],
})
export class RelojRegresivoComponent implements OnInit {
  @Input() fechaFinal;

  timer_id: number = null;
  tiempo_restante: any = null;

  constructor() {}

  ngOnInit() {
    this.reloj_inicial();
  }
  ngOnDestroy(): void {
    if (this.timer_id) {
      clearInterval(this.timer_id);
    }
  }
  reloj_inicial() {
    let date = new Date(moment(this.fechaFinal).format("YYYY-MM-DD"));
    this.timer_id = countdown(
      date,
      (ts) => {
        this.tiempo_restante = ts;
      },
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }
}
