import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'jhi-index-controle-financier',
    templateUrl: './index-controle-financier.component.html',
    styleUrls: ['./index-controle-financier.scss']
})
export class IndexControleFinancierComponent implements OnInit {
    isSaving: boolean;
    items: MenuItem[];

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Engagment',
                icon: 'pi pi-fw pi-list',
                routerLink: '/controle-cf-engagement',
                routerLinkActiveOptions: {exact: true}
            },
            {
                label: 'Liquidation',
                icon: 'pi pi-fw pi-list',
                routerLinkActiveOptions: {exact: true}
            }
        ];
    }
}
