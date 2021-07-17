import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'jhi-index-gestionnaire',
    templateUrl: './index-gestionnaire.component.html',
    styleUrls: ['./index-gestionnaire.scss']
})
export class IndexGestionnaireComponent implements OnInit {
    isSaving: boolean;
    items: MenuItem[];

    constructor() {}

    ngOnInit() {
        this.items = [
            {
                label: 'Elaboration contrat',
                icon: 'pi pi-fw pi-list',
                routerLink: '/elab-contrat',
                routerLinkActiveOptions: {exact: true}
            },
            {
                label: 'Engagement',
                icon: 'pi pi-fw pi-list',
                routerLink: '/engagement',
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
