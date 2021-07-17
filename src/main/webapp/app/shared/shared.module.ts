import {LOCALE_ID, NgModule} from '@angular/core';
import {MarchepublicgatewaySharedLibsModule} from './shared-libs.module';
import {FindLanguageFromKeyPipe} from './language/find-language-from-key.pipe';
import {JhiAlertComponent} from './alert/alert.component';
import {JhiAlertErrorComponent} from './alert/alert-error.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SpinnerModule} from 'primeng/spinner';

registerLocaleData(localeFr);

import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarModule} from 'primeng/calendar';
import {PasswordStrengthBarComponent} from 'app/shared/password-check/password-strength-bar.component';
import {TableGlobalSearchDirective} from 'app/shared/directives/table-global-search.directive';
import {GanttModule} from '@syncfusion/ej2-angular-gantt';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateFRParserFormatter} from 'app/shared/util/ngb-date-fr-parser-formatter';
import {TreeModule} from 'primeng/tree';
import {DataViewModule} from 'primeng/dataview';
import {PipesModule} from 'app/pipe/PipesModule';
import {FormatTableValuePipe} from 'app/shared/util/formatter-mount';
import {IndexGestionnaireComponent} from 'app/entities/microserviceexecution/gestionnaire/index-gestionnaire/index-gestionnaire.component';
import {IndexControleFinancierComponent} from 'app/entities/microserviceexecution/controle-financier/index-controle-financier/index-controle-financier.component';
import {IndexOrdonnancementComponent} from 'app/entities/microserviceexecution/ordonnancement/index-controle-financier/index-ordonnancement.component';
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {SplitButtonModule} from "primeng/splitbutton";
import {PaginatorModule} from "primeng/paginator";
import {DropdownModule} from "primeng/dropdown";
import {KeyFilterModule} from "primeng/keyfilter";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FileUploadModule} from "primeng/fileupload";
import {DialogModule} from "primeng/dialog";
import {MenubarModule} from "primeng/menubar";
import {SelectButtonModule} from "primeng/selectbutton";
import {MegaMenuModule} from "primeng/megamenu";
import {ConfirmationService, MessageService} from "primeng/api";
import {InputMaskModule} from "primeng/inputmask";
import {TabMenuModule} from "primeng/tabmenu";
import {TooltipModule} from "primeng/tooltip";
import {CheckboxModule} from "primeng/checkbox";
import {StepsModule} from "primeng/steps";
import {ChartModule} from "primeng/chart";
import {TabViewModule} from "primeng/tabview";
import {InputSwitchModule} from "primeng/inputswitch";
import {OrderListModule} from "primeng/orderlist";
import {FieldsetModule} from "primeng/fieldset";
import {SidebarModule} from "primeng/sidebar";
import {PickListModule} from "primeng/picklist";
import {EditorModule} from "primeng/editor";
import {PanelModule} from "primeng/panel";
import {ListboxModule} from "primeng/listbox";
import {CardModule} from "primeng/card";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SliderModule} from "primeng/slider";
import {AccordionModule} from "primeng/accordion";
import {MultiSelectModule} from "primeng/multiselect";
import {MessagesModule} from "primeng/messages";
import {RadioButtonModule} from "primeng/radiobutton";

@NgModule({
    imports: [
        MarchepublicgatewaySharedLibsModule,
        PipesModule,
        TableModule,
        ToolbarModule,
        InputTextModule,
        SplitButtonModule,
        PaginatorModule,
        DialogModule,
        ToggleButtonModule,
        DropdownModule,
        ButtonModule,
        MultiSelectModule,
        CheckboxModule,
        AutoCompleteModule,
        MessagesModule,
        InputSwitchModule,
        KeyFilterModule,
        ToastModule,
        RadioButtonModule,
        MegaMenuModule,
        InputMaskModule,
        TabMenuModule,
        PickListModule,
        SelectButtonModule,
        ConfirmDialogModule,
        ListboxModule,
        FieldsetModule,
        ChartModule,
        CalendarModule,
        MenubarModule,
        FullCalendarModule,
        SliderModule,
        SidebarModule,
        TabViewModule,
        GanttModule,
        EditorModule,
        FileUploadModule,
        AccordionModule,
        TreeModule,
        DataViewModule,
        TooltipModule,
        StepsModule,
        SpinnerModule,
        CardModule,
        PanelModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        HasAnyAuthorityDirective,
        PasswordStrengthBarComponent,
        TableGlobalSearchDirective,
        FormatTableValuePipe,
        IndexGestionnaireComponent,
        IndexControleFinancierComponent,
        IndexOrdonnancementComponent
    ],
    entryComponents: [],
    providers: [ConfirmationService, MessageService,
        {provide: LOCALE_ID, useValue: 'fr-FR'},
        {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    ],
    exports: [
        MarchepublicgatewaySharedLibsModule,
        PipesModule,
        FindLanguageFromKeyPipe,
        PasswordStrengthBarComponent,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        TableGlobalSearchDirective,
        HasAnyAuthorityDirective,
        TableModule,
        ToolbarModule,
        InputTextModule,
        SplitButtonModule,
        PaginatorModule,
        DialogModule,
        ToggleButtonModule,
        DropdownModule,
        ButtonModule,
        MultiSelectModule,
        CheckboxModule,
        AutoCompleteModule,
        MessagesModule,
        InputSwitchModule,
        KeyFilterModule,
        ToastModule,
        RadioButtonModule,
        MegaMenuModule,
        InputMaskModule,
        TabMenuModule,
        PickListModule,
        SelectButtonModule,
        ConfirmDialogModule,
        ListboxModule,
        FieldsetModule,
        ChartModule,
        CalendarModule,
        MenubarModule,
        FullCalendarModule,
        SliderModule,
        SidebarModule,
        TabViewModule,
        GanttModule,
        EditorModule,
        OrderListModule,
        FileUploadModule,
        AccordionModule,
        TreeModule,
        DataViewModule,
        TooltipModule,
        StepsModule,
        SpinnerModule,
        CardModule,
        PanelModule,
        FormatTableValuePipe,
        IndexGestionnaireComponent,
        IndexControleFinancierComponent,
        IndexOrdonnancementComponent,
    ]
})
export class MarchepublicgatewaySharedModule {}
