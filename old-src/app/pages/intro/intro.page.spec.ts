import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../services/api.service';
import { RTLService } from '../../services/rtl.service';
import { ConnecareDatePipe } from '../../pipes/date/date';
import { Component, Input } from '@angular/core';

function clone(val) {
  return JSON.parse(JSON.stringify(val));
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;


  @Component({
    selector: 'connecare-alerts-list',
    template: ''
  })
  class AlertsListComponent {
    @Input() public for: any;
  }

  @Component({
    selector: 'connecare-dashboard-messages-list',
    template: ''
  })
  class DashboardMessagesListComponent {
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HomePage, AlertsListComponent, DashboardMessagesListComponent, ConnecareDatePipe],
      providers: [
        {
          provide: ApiService,
          useValue: {
            post() {
              return Promise.resolve();
            },
            get() {
              return Promise.resolve([]);
            },
            delete() {
              return Promise.resolve();
            }
          }
        },
        {
          provide: RTLService,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {

    it('should prevent making request when tenant id is undefined or null', fakeAsync(() => {
      const api = TestBed.get(ApiService);

      spyOn(localStorage, 'getItem').and.callFake(() => null);
      spyOn(api, 'get').and.callFake(() => {
        return Promise.resolve([]);
      });

      fixture.detectChanges();
      tick();

      expect(api.get).not.toHaveBeenCalled();


    }));

    it('should try to make request for to get array of tasks', fakeAsync(() => {
      const api = TestBed.get(ApiService);
      const fakeId = 'fake-id';
      spyOn(api, 'get').and.callFake(() => {
        return Promise.resolve([]);
      });
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return fakeId;
      });

      fixture.detectChanges();
      tick();

      expect(api.get).toHaveBeenCalledWith(`/workspaces/${fakeId}/humantasks/me/active`);

    }));

    it('should try to make request for to get array of tasks', fakeAsync(() => {
      const api = TestBed.get(ApiService);
      const fakeId = 'fake-id';
      spyOn(api, 'get').and.callFake(() => {
        return Promise.resolve([]);
      });
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return fakeId;
      });

      fixture.detectChanges();
      tick();

      expect(api.get).toHaveBeenCalledWith(`/workspaces/${fakeId}/humantasks/me/active`);

    }));

    it('should turn received tasks to ActiveTasks and then sort by date', fakeAsync(() => {

      const sampleTask = {
        index: 0,
        parentStage: 'parent-stage',
        isRepeatable: true,
        next: 'next-str',
        state: '',
        prev: '',
        dueDate: '',
        id: 'fake-task-id',
        isAutoDraft: '',
        processDefinition: '',
        possibleActions: [],
        nrAlerts: '',
        isManualActivation: true,
        taskParams: [],
        description: 'fake-task-description',
        name: 'fake-task-name',
        isMandatory: '',
        owner: {
          disambiguation: '',
          id: '',
          email: '',
          name: ''
        },
        case: 'task-case',
        resourceType: 'fake-resource-type',
        patient: {
          id: '',
          email: '',
          age: 12345,
          name: 'task-patient-name',
          lastname: '',
          firstname: ''
        },
        stateTransitions: {
          ACTIVE: null,
          AVAILABLE: {
            by: {
              id: '',
              name: '',
              resourceType: ''
            },
            date: '2017-12-18 12:32:54.0' // 2017-12-18 12:32:54.0
          },
          COMPLETED: null,
          ENABLED: null,
          TERMINATED: null
        }
      };
      const task = clone(sampleTask);
      task.stateTransitions.AVAILABLE.date = '2017-12-18 12:32:54.0'; // 1
      task.description = 'some task description for the task';
      const task1 = clone(sampleTask);
      task1.stateTransitions.AVAILABLE.date = '2022-12-18 12:32:54.0'; // 4
      task1.patient.name = 'task1 patient name';
      const task2 = clone(sampleTask);
      task2.stateTransitions.AVAILABLE.date = '2017-12-18 12:32:55.0'; // 2
      task2.name = 'Some name for task2';
      const task3 = clone(sampleTask);
      task3.stateTransitions.AVAILABLE.date = '2017-12-23 12:32:54.0'; // 3

      const task4 = clone(sampleTask);
      task4.stateTransitions.AVAILABLE.date = '2022-12-18 12:32:54.0'; // 4
      task4.patient.name = 'task1 patient name';

      const tasks = [task, task1, task2, task3, task4];

      const api = TestBed.get(ApiService);
      const fakeId = 'fake-id';

      spyOn(api, 'get').and.callFake(() => {
        return Promise.resolve(tasks);
      });
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return fakeId;
      });

      fixture.detectChanges();
      tick();

      expect(component.activeTasks[0]).toEqual({
        taskId: task.id,
        taskType: task.resourceType,
        name: task.name,
        description: task.description,
        patient: task.patient.name,
        date: task.stateTransitions.AVAILABLE.date,
        caseId: task.case,
        stageId: task.parentStage
      });

      expect(component.activeTasks[2]).toEqual({
        taskId: task3.id,
        taskType: task3.resourceType,
        name: task3.name,
        description: task3.description,
        patient: task3.patient.name,
        date: task3.stateTransitions.AVAILABLE.date,
        caseId: task3.case,
        stageId: task3.parentStage
      });

      expect(component.activeTasks[3]).toEqual({
        taskId: task1.id,
        taskType: task1.resourceType,
        name: task1.name,
        description: task1.description,
        patient: task1.patient.name,
        date: task1.stateTransitions.AVAILABLE.date,
        caseId: task1.case,
        stageId: task1.parentStage
      });


    }));


  });

});
