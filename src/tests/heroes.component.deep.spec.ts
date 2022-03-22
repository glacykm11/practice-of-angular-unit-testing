import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';
import { HeroComponent } from 'src/app/hero/hero.component';
import { HeroesComponent } from '../app/heroes/heroes.component';

describe('HeroesComponent (deep tests)', () => {
    let component: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;
    let fixture: any;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        TestBed.configureTestingModule({
            declarations:[HeroesComponent, HeroComponent],
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
    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOnInit()
        fixture.detectChanges();
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentDEs.length).toEqual(3);

        for(let i=0; i < heroComponentDEs.length; i++){
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }

        // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
        // expect(heroComponentDEs[1].componentInstance.hero.name).toEqual('SpiderGuy');
        // expect(heroComponentDEs[2].componentInstance.hero.name).toEqual('SpiderFellow');
    })

    it('should call heroService.deleteHero when the Hero Components delete button is clicked', () => {
        spyOn(fixture.componentInstance, 'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOnInit()
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
         .triggerEventHandler('click', {stopPropagation: () => {}})

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
    })
})
