
import { EventListComponent } from './event-list.component';
import { of } from 'rxjs';

describe('EventListComponent', () => {

    let mockEventListService;
    let component: EventListComponent;

    beforeEach(() => {
        mockEventListService = jasmine.createSpyObj(['deleteEventDet', 'getEvents']);
        component = new EventListComponent(mockEventListService, null, null);
    });

    describe('deleteEvent', () => {
        xit('should call deleteevent', () => {
            mockEventListService.deleteEventDet.and.returnValue(of(true));
            component.deleteEvent("123")
            expect(mockEventListService.deleteEventDet).toHaveBeenCalled();
        })
    })

    describe('getEventList', () => {
        it('should call getEventList', () => {
            mockEventListService.getEvents.and.returnValue(of(true));
            component.getEventList();
            expect(mockEventListService.getEvents).toHaveBeenCalled();
        })
    })

})
