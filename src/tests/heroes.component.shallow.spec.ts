import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';
import { HeroesComponent } from '../app/heroes/heroes.component';

describe('Heroes Component (shallow tests)', () => {

    let component: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;
    let fixture: any;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })
    class FakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();
    }

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

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name: "SuperMan", strength: 3};

        expect(fixture.componentInstance.hero.name).toEqual("SuperMan")
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name: "SuperMan", strength: 3};
        fixture.detectChanges();

        // let deA = fixture.debugElement.query(By.css('a'));
        // expect(deA.nativeElement.textContent).toContain("SuperMan");

        expect(fixture.nativeElement.querySelector('a').textContent).toContain("SuperMan");
    })

    it('should create on li for each hero', ()=> {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges();
        
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3)
    })
})