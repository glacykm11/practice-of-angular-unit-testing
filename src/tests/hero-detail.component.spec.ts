import { TestBed, ComponentFixture, fakeAsync, tick, flush, waitForAsync } from "@angular/core/testing"
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroDetailComponent } from "../app/hero-detail/hero-detail.component"
import { HeroService } from "../app/hero.service";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: {get: () => {return '3'}}}
        }
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero'])
        mockLocation = jasmine.createSpyObj(['back'])

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: Location, useValue: mockLocation},
                {provide: HeroService, useValue: mockHeroService},
            ]
        })

        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id:3,name:'SuperDude', strength: 100}))
    })

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE')
    })

    // it('should call updateHero when save is called', fakeAsync(() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     se souber quantos milisegundos irão demorar para retornar algo de forma assíncrona
    //     tick(250);

    //     o flush é utilizado quando não se sabe em quanto tempo a função assíncrona irá retornar valores
    //     flush();

    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
    // }))

    it('should call updateHero when save is called', waitForAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        //Só funciona para Promises
        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        })
    }))
})