import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SigninComponent } from 'src/app/user/signin/signin.component';
import { UserprofileComponent } from 'src/app/userprofile/userprofile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { UpdateUserComponent } from 'src/app/user/update-user/update-user.component';
import { MessageComponent } from './message/message.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { EventComponent } from './event/event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { VolRegComponent } from './vol-reg/vol-reg.component';
import { CreateBulkEventComponent } from './event/create-bulk-event/create-bulk-event.component';
import { VolRegEventlistComponent } from './user/vol-reg-eventlist/vol-reg-eventlist.component';
import { EventPostUpdatesComponent } from './event/event-post-updates/event-post-updates.component';
import { EventmgntComponent } from './admin/eventmgnt/eventmgnt.component';
import { ViewEventdetComponent } from './event/view-eventdet/view-eventdet.component';
import { BulkEventRegComponent } from './bulk-event-reg/bulk-event-reg.component';
import { RptEventInfoComponent } from './reports/rpt-event-info/rpt-event-info.component';
import { RptEventRegStatusComponent } from './reports/rpt-event-reg-status/rpt-event-reg-status.component';
import { ReportsComponent } from './reports/reports.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: 'signup', component: UserComponent, data: { title: 'User' },
        children: [{ path: '', component: SignUpComponent, data: { title: 'Sign Up' } }]
    },
    {
        path: 'signin', component: UserComponent, data: { title: 'User' },
        children: [{ path: '', component: SigninComponent, data: { title: 'Sign In' } }]
    },
    { path: 'userprofile/:id', component: UserprofileComponent, data: { title: 'User Profile' }, canActivate: [AuthGuard] },
    { path: 'registration/:eid', component: RegistrationComponent, data: { title: 'Registration' }, canActivate: [AuthGuard] },
    { path: 'updateuser/:id', component: UpdateUserComponent, data: { title: 'Update User' }, canActivate: [AuthGuard] },
    { path: 'userlist', component: UserListComponent, data: { title: 'User List' }, canActivate: [AuthGuard] },
    { path: 'message/:message', component: MessageComponent, data: { title: 'Message' } },
    { path: 'home', component: HomeComponent, data: { title: 'User' } },
    { path: '', component: HomeComponent, pathMatch: 'full', data: { title: 'User' } },
    {
        path: 'createevent', component: EventComponent, data: { title: 'Create Event' },
        children: [{ path: '', component: CreateEventComponent, data: { title: 'Create Event' }, canActivate: [AuthGuard] }]
    },
    {
        path: 'editevent/:id', component: EventComponent, data: { title: 'Edit Event' },
        children: [{ path: '', component: EditEventComponent, data: { title: 'Edit Event' }, canActivate: [AuthGuard] }]
    },
    { path: 'eventlist', component: EventListComponent, data: { title: 'Event List' }, canActivate: [AuthGuard] },
    { path: 'createbulkevent', component: CreateBulkEventComponent, data: { title: 'Create bulk events' }, canActivate: [AuthGuard] },
    { path: 'volreg', component: VolRegComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    { path: 'bulkeventreg', component: BulkEventRegComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    { path: 'uservolreglist', component: VolRegEventlistComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    { path: 'eventmgnt', component: EventmgntComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    { path: 'vieweventdet/:id', component: ViewEventdetComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    // { path: 'rpteventinfo', component: RptEventInfoComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    { path: 'eventpostupdates', component: EventPostUpdatesComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    // { path: 'rpteventregstatus', component: RptEventRegStatusComponent, data: { title: 'Volunteering Registration' }, canActivate: [AuthGuard] },
    {
        path: 'rpteventregstatus', component: ReportsComponent, data: { title: 'Create Event' },
        children: [{ path: 'rptevent', component: RptEventRegStatusComponent, data: { title: 'Create Event' }, canActivate: [AuthGuard] },
        { path: 'rpteventinfo', component: RptEventInfoComponent, data: { title: 'Create Event' }, canActivate: [AuthGuard] }
    ]
    }
   
    // { path: '', component: SigninComponent, data: { title: 'Volunteering Registration' } },

];

// { path: 'userprofile/:id', component: UserprofileComponent, data: {title: 'User Profile'}, canActivate: [AuthGuard] },

export const routing = RouterModule.forRoot(routes);