import { TestBed } from '@angular/core/testing';
import { HeroService } from './../app/hero.service';
import { MessageService } from './../app/message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

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
        service = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        
        it('should call get with the correct URL', () => {
            //chama o método getHero
            service.getHero(4).subscribe();

            //testa se a URL está correta
            const req = httpTestingController.expectOne('api/heroes/4');

            //envia a resposta 
            req.flush({id:4, name: 'SuperDude', strength: 100})

            //garante que não haja mais de uma chamada
            httpTestingController.verify();

            expect(req.request.method).toBe('GET');
        })
    })
})