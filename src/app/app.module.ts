import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { CoursesadditionComponent } from './components/coursesaddition/coursesaddition.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseslistComponent } from './components/courseslist/courseslist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from './main-services/courses.service';
import { CategoryadditionComponent } from './components/categoryaddition/categoryaddition.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AcceptCoursesComponent } from './components/accept-courses/accept-courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    CoursesadditionComponent,
    CourseslistComponent,
    CategoryadditionComponent,
    HomeComponent,
    HeaderComponent,
    LecturesComponent,
    LoginComponent,
    RegisterComponent,
    StudentsListComponent,
    AcceptCoursesComponent,
    CourseDetailsComponent,
    MyCoursesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    AccordionModule.forRoot()


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CoursesService,
    ToastrService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
