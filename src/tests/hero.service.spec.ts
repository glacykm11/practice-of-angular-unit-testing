import { TestBed } from '@angular/core/testing';
import { HeroService } from './../app/hero.service';
import { MessageService } from './../app/message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        })

        httpTestingController = TestBed.inject(HttpTestingController);
        let msgSvc = TestBed.inject(MessageService);
    })
})