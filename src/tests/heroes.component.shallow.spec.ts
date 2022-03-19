import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroService } from 'src/app/hero.service';
import { HeroesComponent } from '../app/heroes/heroes.component';

describe('Heroes Component (shallow tests)', () => {

    let component: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;
    let fixture: any;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        TestBed.configureTestingModule({
            declarations:[HeroesComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'SpiderGuy', strength: 9},
            {id: 3, name: 'SpiderFellow', strength: 10}
        ]

        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3)
    })
})