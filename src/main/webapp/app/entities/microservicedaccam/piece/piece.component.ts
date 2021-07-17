import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import {PieceService} from 'app/entities/microservicedaccam/piece/piece.service';
import {IPiece, Piece} from 'app/shared/model/microservicedaccam/piece.model';

import {ConfirmationService, MessageService} from "primeng/api";





@Component({
  selector: 'jhi-piece',
  templateUrl: './piece.component.html'
})
export class PieceComponent implements OnInit, OnDestroy {
  pieces: IPiece[];
  pieceSelected: IPiece[];
  piece: IPiece;
  displaych: boolean;
  error: any;
  success: any;
  displayDelete: boolean;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;

  predicate: any;
  previousPage: any;
  displayAdd: boolean;
  isSaving: boolean;
  reverse: any;

  constructor(

    protected pieceService: PieceService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.pieceService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPiece[]>) => this.paginatePieceCandidats(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  annuler() {
    this.piece = new Piece();
    this.displayAdd = false;
    this.loadAll();
  }
  annulerDelete() {
    this.piece = new Piece();
    this.displayDelete = false;
  }
  protected onSaveError() {
    this.isSaving = false;
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.displayAdd = false;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPiece>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Pièce ajoutée avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }
  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.piece.id !== undefined) {
        this.subscribeToSaveResponse(this.pieceService.update(this.piece));
      } else {
        this.subscribeToSaveResponse(this.pieceService.create(this.piece));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'La pièce existe déjà !');
    }
  }
  ifExist(): boolean {
    if (this.piece.id) {
      return this.pieces.some(
        value => value.id !== this.piece.id && value.nomPiece === this.piece.nomPiece
      );
    } else {
      return this.pieces.some(value => value.nomPiece === this.piece.nomPiece);
    }
  }

  transition() {
    this.router.navigate(['/piece'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/piece',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
  deleteElement(piece: IPiece) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (piece === null) {
          return;
        } else {
          piece.deleted = true;
          this.pieceService.update(piece).subscribe(
            () => {
              this.loadAll();
              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }

  ngOnInit() {
    this.displayAdd = false;
    this.displaych = false;

    this.piece = new Piece();
    this.loadAll();
    this.isSaving = false;

    this.registerChangeInPieceCandidats();
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }



  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }
  add(piece: IPiece) {
    piece === null ? (this.piece= new Piece()) : (this.piece = piece);
    this.displayAdd = true;
  }
  supprimer() {
    this.displayDelete = true;
  }

  trackId(index: number, item: IPiece) {
    return item.id;
  }

  registerChangeInPieceCandidats() {
    this.eventSubscriber = this.eventManager.subscribe('pieceListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePieceCandidats(data: IPiece[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.pieces = data;
  }
  deleteAll() {
    this.pieceService.deleteAll(this.pieceSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
}
