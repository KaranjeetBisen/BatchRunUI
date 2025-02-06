import { Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { UploadPreviewComponent } from './components/upload-preview/upload-preview.component';
import { FileViewer2Component } from './components/file-viewer2/file-viewer2.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BatchrunComponent } from './components/batchrun/batchrun.component';
import { CreateConfigFormComponent } from './components/create-config-form/create-config-form.component';

export const routes: Routes = [

    {path:'', component:BaseComponent,
        children:[
            {path:'homepage' , component: HomepageComponent },
            {path:'', pathMatch:'full', component: HomepageComponent},
            {path:'preview-edit' , component: UploadPreviewComponent },
            {path:'preview' , component: FileViewer2Component },
            {path:'batchrun' , component: CreateConfigFormComponent }
            

        ]
    }
];
