import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
    selector: 'jhi-index-ordonnancement',
    templateUrl: './index-ordonnancement.component.html',
    styleUrls: ['./index-ordonnancement.scss']
})
export class IndexOrdonnancementComponent implements OnInit {
    isSaving: boolean;
    items: MenuItem[];

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Engagment',
                icon: 'pi pi-fw pi-list',
                routerLink: '/controle-ordo-engagement',
                routerLinkActiveOptions: {exact: true}
            },
            {
                label: 'Liquidation',
                icon: 'pi pi-fw pi-list',
                routerLink: '/liquidation',
                routerLinkActiveOptions: {exact: true}
            }
        ];
    }
}
