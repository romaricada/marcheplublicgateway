import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JhiEventManager } from 'ng-jhipster';

import {IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {BesoinLigneBudgetaireService} from 'app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service';
import {soldeTotal} from 'app/shared/util/common-function';
import {AvisDacService} from 'app/entities/microservicedaccam/avis-dac/avis-dac.service';
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {ISourceFinancement} from "app/shared/model/microserviceppm/source-financement.model";
import {HttpResponse} from "@angular/common/http";
import {SourceFinancementService} from "app/entities/microserviceppm/source-financement/source-financement.service";

@Component({
  selector: 'jhi-elaboration-contrat-detail-dialog',
  templateUrl: './elaboration-contrat-dialog.component.html'
})
export class ContratDialogComponent implements OnInit {
  contrat: IContrat;
  avisdac: IAvisDac;
  sourceFinancements: ISourceFinancement[];
  sourceFinancement: ISourceFinancement;
    besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
    totaTMontant: number;

  constructor(
              protected eventManager: JhiEventManager,
              protected activatedRoute: ActivatedRoute,
              protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
              protected sourceFinancementService: SourceFinancementService,
              protected avisDacService: AvisDacService) {}

  ngOnInit(): void {
      this.activatedRoute.data.subscribe( ({contrat})  => {
          this.contrat = contrat;
          this.loadAllSourceFinancement();
          this.avisDacService.find(this.contrat.avisDacId).subscribe(res => {
              this.contrat.avisDacNumero = res.body.numeroAvis;
              this.contrat.avisDacLibelle = res.body.objet;
              this.besoinLigneBudgetaireService.findAllBesoinLigneBudgetaireByActivite(res.body.activiteId)

                  .subscribe(res1 => {
                      if (res1.body) {
                          this.besoinLigneBudgetaires = [];
                          res1.body.forEach(v => {
                              if (this.contrat.ligneBudgetaireContrats.some(l => l.ligneBudgetaireId === v.ligneBudgetId)) {
                                  v.selected = true;
                                  window.console.log(v);
                                  this.besoinLigneBudgetaires.push(v);
                              }
                          });
                          this.totaTMontant = soldeTotal(this.besoinLigneBudgetaires
                              .map(v => v.montantEstime));
                      }
                  });
          });
      });
  }
  loadAllSourceFinancement() {
    this.sourceFinancementService.findAllSourceFinancement().subscribe((res: HttpResponse<ISourceFinancement[]>) => {
      this.sourceFinancements = res.body;
      window.console.log("+++++++===this.sourceFinancements===++++++{}",this.sourceFinancements);
    });
  }
    previousState() {
        window.history.back();
    }
}
