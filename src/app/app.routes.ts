import { Routes } from '@angular/router';
import { FileViewer2Component } from './components/commons/file-viewer2/file-viewer2.component';
import { UploadPreviewComponent } from './components/batch-run/upload-preview/upload-preview.component';
import { BaseComponent } from './components/commons/base/base.component';
import { HomepageComponent } from './components/commons/homepage/homepage.component';
import { EmailReportComponent } from './components/report/email-report/email-report.component';
import { CreateConfigFormComponent } from './components/batch-run/create-config-form/create-config-form.component';
import { BatchrunComponent } from './components/batch-run/batchrun/batchrun.component';
import { TestRunFormComponent } from './components/batch-run/test-run-form/test-run-form.component';


export const routes: Routes = [

    {path:'', component:BaseComponent,
        children:[
            {path:'homepage' , component: HomepageComponent },
            {path:'', pathMatch:'full', component: HomepageComponent},
            {path:'preview-edit' , component: UploadPreviewComponent },
            {path:'preview' , component: FileViewer2Component },
            {path:'batchrun' , component: BatchrunComponent},
            {path:'report' , component: EmailReportComponent },
            {path:'create-config' , component: CreateConfigFormComponent },
            {path:'test-run' , component: TestRunFormComponent },

        ]
    }
];
