import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'ligne-budgetaire',
                loadChildren: () =>
                    import('./microserviceppm/ligne-budgetaire/ligne-budgetaire.module').then(m => m.MicroserviceppmLigneBudgetaireModule)
            },
            {
                path: 'besoin',
                loadChildren: () => import('./microserviceppm/besoin/besoin.module').then(m => m.MicroserviceppmBesoinModule)
            },
            {
                path: 'besoin-ligne-budgetaire',
                loadChildren: () => import('./microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.module').then(m => m.MicroserviceppmBesoinLigneBudgetaireModule)
            },
            {
                path: 'exercice-budgetaire',
                loadChildren: () => import('./microserviceppm/exercice-budgetaire/exercice-budgetaire.module').then(m => m.MicroserviceppmExerciceBudgetaireModule)
            },
            {
                path: 'unite-administrative',
                loadChildren: () => import('./microserviceppm/unite-administrative/unite-administrative.module').then(m => m.MicroserviceppmUniteAdministrativeModule)
            },
            {
                path: 'mode-passation',
                loadChildren: () => import('./microserviceppm/mode-passation/mode-passation.module').then(m => m.MicroserviceppmModePassationModule)
            },
            {
                path: 'ppm',
                loadChildren: () => import('./microserviceppm/ppm/ppm.module').then(m => m.MicroserviceppmPPMModule)
            },
            {
                path: 'activite',
                loadChildren: () => import('./microserviceppm/activite/activite.module').then(m => m.MicroserviceppmActiviteModule)
            },
            {
                path: 'acteur',
                loadChildren: () => import('./microserviceppm/acteur/acteur.module').then(m => m.MicroserviceppmActeurModule)
            },
            {
                path: 'referentiel-delai',
                loadChildren: () => import('./microserviceppm/referentiel-delai/referentiel-delai.module').then(m => m.MicroserviceppmReferentielDelaiModule)
            },
            {
                path: 'source-financement',
                loadChildren: () => import('./microserviceppm/source-financement/source-financement.module').then(m => m.MicroserviceppmSourceFinancementModule)
            },
            {
                path: 'etape',
                loadChildren: () => import('./microserviceppm/etape/etape.module').then(m => m.MicroserviceppmEtapeModule)
            },
            {
                path: 'ppm-activite',
                loadChildren: () => import('./microserviceppm/ppm-activite/ppm-activite.module').then(m => m.MicroserviceppmPpmActiviteModule)
            },
            {
                path: 'etape-activite-ppm',
                loadChildren: () => import('./microserviceppm/etape-activite-ppm/etape-activite-ppm.module').then(m => m.MicroserviceppmEtapeActivitePpmModule)
            },
            {
                path: 'nature-prestation',
                loadChildren: () => import('./microserviceppm/nature-prestation/nature-prestation.module').then(m => m.MicroserviceppmNaturePrestationModule)
            },
            {
                path: 'timbre',
                loadChildren: () => import('./microserviceppm/timbre/timbre.module').then(m => m.MicroserviceppmTimbreModule)
            },
            {
                path: 'membre',
                loadChildren: () => import('./microservicedaccam/membre/membre.module').then(m => m.MicroservicedaccamMembreModule)
            },
            {
                path: 'type-commission',
                loadChildren: () => import('./microservicedaccam/type-commission/type-commission.module').then(m => m.MicroservicedaccamTypeCommissionModule)
            }, {
                path: 'institution-financiere',
                loadChildren: () => import('./microservicedaccam/institutionFinanciere/institutionFinanciere.module').then(m => m.MicroservicedaccamInstitutionFinanciereModule)
            },
            {
                path: 'reception',
                loadChildren: () => import('./microservicedaccam/reception/reception.module').then(m => m.MicroservicedaccamReceptionModule)
            },
            {
                path: 'membre-commission',
                loadChildren: () => import('./microservicedaccam/membre-commission/membre-commission.module').then(m => m.MicroservicedaccamMembreCommissionModule)
            },
            {
                path: 'tache',
                loadChildren: () => import('./microservicedaccam/tache/tache.module').then(m => m.MicroservicedaccamTacheModule)
            },
            {
                path: 'workflow',
                loadChildren: () => import('./microservicedaccam/workflow/workflow.module').then(m => m.MicroservicedaccamWorkflowModule)
            },
            {
                path: 'tache-workflow',
                loadChildren: () => import('./microservicedaccam/tache-workflow/tache-workflow.module').then(m => m.MicroservicedaccamTacheWorkflowModule)
            },
            {
                path: 'candidat',
                loadChildren: () => import('./microservicedaccam/candidat/candidat.module').then(m => m.MicroservicedaccamCandidatModule)
            },
            {
                path: 'candidat-lot',
                loadChildren: () => import('./microservicedaccam/candidat-lot/candidat-lot.module').then(m => m.MicroservicedaccamCandidatLotModule)
            },
            {
                path: 'decision',
                loadChildren: () => import('./microservicedaccam/decision/decision.module').then(m => m.MicroservicedaccamDecisionModule)
            },
            {
                path: 'reclamation',
                loadChildren: () => import('./microservicedaccam/reclamation/reclamation.module').then(m => m.MicroservicedaccamReclamationModule)
            },

            {
                path: 'depouillement',
                loadChildren: () => import('./microservicedaccam/depouillement/depouillement.module').then(m => m.MicroservicedaccamDepouillementModule)
            },
            {
                path: 'deliberation',
                loadChildren: () => import('./microservicedaccam/deliberation/deliberation.module').then(m => m.MicroservicedaccamDeliberationModule)
            },
            {
                path: 'etat',
                loadChildren: () => import('./microservicedaccam/etat/etat.module').then(m => m.MicroservicedaccamEtatModule)
            },
            {
                path: 'piece-candidat',
                loadChildren: () => import('./microservicedaccam/piece-candidat/piece-candidat.module').then(m => m.MicroservicedaccamPieceCandidatModule)
            },
            {
                path: 'piece',
                loadChildren: () => import('./microservicedaccam/piece/piece.module').then(m => m.MicroservicedaccamPieceModule)
            },
            {
                path: 'contrat',
                loadChildren: () => import('./microserviceexecution/contrat/contrat.module').then(m => m.MicroserviceexecutionContratModule)
            },
            {
                path: 'statut-execution',
                loadChildren: () => import('./microserviceexecution/statut-execution/statut-execution.module').then(m => m.MicroserviceexecutionStatutExecutionModule)
            },
            {
                path: 'etape-execution',
                loadChildren: () => import('./microserviceexecution/etape-execution/etape-execution.module').then(m => m.MicroserviceexecutionEtapeExecutionModule)
            },
            {
                path: 'contentieux',
                loadChildren: () => import('./microserviceexecution/contentieux/contentieux.module').then(m => m.MicroserviceexecutionContentieuxModule)
            },
            {
                path: 'avenant',
                loadChildren: () => import('./microserviceexecution/avenant/avenant.module').then(m => m.MicroserviceexecutionAvenantModule)
            },
            {
                path: 'penalite',
                loadChildren: () => import('./microserviceexecution/penalite/penalite.module').then(m => m.MicroserviceexecutionPenaliteModule)
            },
            {
                path: 'liquidation',
                loadChildren: () => import('./microserviceexecution/liquidation/liquidation.module').then(m => m.MicroserviceexecutionLiquidationModule)
            },
            {
                path: 'ordres-service',
                loadChildren: () => import('./microserviceexecution/ordreDeService/ordreDeService.module').then(m => m.MicroserviceexecutionOrdreDeServiceModule)
            },
            {
                path: 'ordre-commande',
                loadChildren: () => import('./microserviceexecution/ordre-commande/ordre-commande.module').then(m => m.MicroserviceexecutionOrdreCommandeModule)
            },
            {
                path: 'type-avenant',
                loadChildren: () => import('./microserviceexecution/type-avenant/type-avenant.module').then(m => m.MicroserviceexecutionTypeAvenantModule)
            },
            {
                path: 'decision-contentieux',
                loadChildren: () => import('./microserviceexecution/decision-contentieux/decision-contentieux.module').then(m => m.MicroserviceexecutionDecisionContentieuxModule)
            },
            {
                path: 'entrepot',
                loadChildren: () => import('./microserviceged/entrepot/entrepot.module').then(m => m.MicroservicegedEntrepotModule)
            },
            {
                path: 'locale',
                loadChildren: () => import('./microserviceged/locale/locale.module').then(m => m.MicroservicegedLocaleModule)
            },
            {
                path: 'type-entrepot',
                loadChildren: () => import('./microserviceged/type-entrepot/type-entrepot.module').then(m => m.MicroservicegedTypeEntrepotModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./microserviceged/document/document.module').then(m => m.MicroservicegedDocumentModule)
            },
            {
                path: 'type-archive',
                loadChildren: () => import('./microserviceged/type-archive/type-archive.module').then(m => m.MicroservicegedTypeArchiveModule)
            },
            {
                path: 'type-document',
                loadChildren: () => import('./microserviceged/type-document/type-document.module').then(m => m.MicroservicegedTypeDocumentModule)
            },
            {
                path: 'serveur',
                loadChildren: () => import('./microserviceged/serveur/serveur.module').then(m => m.MicroservicegedServeurModule)
            },
            {
                path: 'reclamation-candidat-lot',
                loadChildren: () => import('./microservicedaccam/reclamation-candidat-lot/reclamation-candidat-lot.module').then(m => m.MicroservicedaccamReclamationCandidatLotModule)
            },
            {
                path: 'lot',
                loadChildren: () => import('./microservicedaccam/lot/lot.module').then(m => m.MicroservicedaccamLotModule)
            },
            {
                path: 'tache-etape',
                loadChildren: () => import('./microservicedaccam/tache-etape/tache-etape.module').then(m => m.MicroservicedaccamTacheEtapeModule)
            },
            {
                path: 'import-export',
                loadChildren: () => import('./microserviceppm/import-export/import-export.module').then(m => m.MicroserviceppmImportExportModule)
            },
            {
                path: 'ppm-deconcentre',
                loadChildren: () => import('./microserviceppm/ppm-deconcentre/ppm-deconcentre.module').then(m => m.MicroserviceppmDeconcentreModule)
            },
            {
                path: 'alert',
                loadChildren: () => import('./microserviceppm/alert/alert.module').then(m => m.MicroserviceppmAlertModule)
            },
            {
                path: 'nature-prestation-mode-passation',
                loadChildren: () => import('./microserviceppm/nature-prestation-mode-passation/nature-prestation-mode-passation.module').then(m => m.NaturePrestationModePassationModule)
            },
            {
                path: 'jour-ferier',
                loadChildren: () => import('./microserviceppm/jour-ferier/jour-ferier.module').then(m => m.MicroserviceppmJourFerierModule)
            },
            {
                path: 'report',
                loadChildren: () => import('./microserviceppm/report-a-nouveau/report-a-nouveau.module').then(m => m.MicroserviceppmReportANouveauModule)
            },
            {
                path: 'besoin-activite',
                loadChildren: () => import('./microserviceppm/besoin-activite/besoin-activite.module').then(m => m.MicroserviceppmBesoinActiviteModule)
            },

            {
                path: 'create-tache',
                loadChildren: () => import('./microservicedaccam/create-tache/create-tache.module').then(m => m.CreateTacheModule)
            },
            {
                path: 'type-caution',
                loadChildren: () => import('./microservicedaccam/type-caution/type-caution.module').then(m => m.MicroservicedaccamTypeCautionModule)
            },
            {
                path: 'caution',
                loadChildren: () => import('./microservicedaccam/caution/caution.module').then(m => m.MicroservicedaccamCautionModule)
            },

            {
                path: 'candidat-caution-lot',
                loadChildren: () => import('./microservicedaccam/candidatCautionLot/candidatCautionLot.module').then(m => m.MicroservicedaccamCandidatCautionLotModule)
            },
            {
                path: 'suivi-execution',
                loadChildren: () => import('./microserviceexecution/suivi-execution/suivi-execution.module').then(m => m.MicroserviceexecutionSuiviExecutionModule)
            },
            {
                path: 'suivi-dac',
                loadChildren: () => import('./microservicedaccam/suivi-dac/suivi-dac.module').then(m => m.SuiviDacModule)
            },
            {
                path: 'calcul-delai',
                loadChildren: () => import('./microserviceppm/calcul-delai/calcul-delai.module').then(m => m.MicroserviceppmCalculDelaiModule)
            },
            {
                path: 'delaiMessage',
                loadChildren: () => import('./microservicedaccam/delaiMessage/delaiMessage.module').then(m => m.MicroservicedaccamDelaiMessageModule)
            },
            {
                path: 'engagement',
                loadChildren: () => import('./microserviceexecution/engagement/engagement.module').then(m => m.MicroserviceexecutionEngagementModule)
            },
            {
                path: 'ligneBudgetaireEngagement',
                loadChildren: () => import('./microserviceexecution/ligneBudgetaireEngagement/ligneBudgetaireEngagement.module').then(m => m.MicroserviceexecutionLigneBudgetaireEngagementModule)
            },
            {
                path: 'avis-dac',
                loadChildren: () => import('./microservicedaccam/avis-dac/avis-dac.module').then(m => m.MicroservicedaccamAvisDacModule)
            },
            {
                path: 'ligne-budgetaire-contrat',
                loadChildren: () => import('./microserviceexecution/ligneBudgetaireContrat/ligneBudgetaireContrat.module').then(m => m.MicroserviceexecutionLigneBudgetaireContratModule)
            },
            {
                path: 'elab-contrat',
                loadChildren: () => import('./microserviceexecution/gestionnaire/elaboration-contrat/elaboration-contrat.module').then(m => m.MicroserviceexecutionElabContratModule)
            },
            {
                path: 'controle-cf-engagement',
                loadChildren: () => import('./microserviceexecution/controle-financier/controle-engagement/controle-engagement.module').then(m => m.MicroserviceexecutionControlCFEngagementModule)
            },
            {
                path: 'controle-ordo-engagement',
                loadChildren: () => import('./microserviceexecution/ordonnancement/controle-ordo-engagement/controle-ordo-engagement.module').then(m => m.MicroserviceexecutionControlOrdoEngagementModule)
            }
        ])
    ],
    declarations: []
})
export class MarchepublicgatewayEntityModule {
}
